import type { Child } from '@tauri-apps/plugin-shell';

import type { WireproxyInstance } from '../types';

import { join } from '@tauri-apps/api/path';
import { remove, writeTextFile } from '@tauri-apps/plugin-fs';
import { Command } from '@tauri-apps/plugin-shell';
import { nanoid } from 'nanoid';

import { getPaths } from './config';
import { serializeWireproxyInstance } from './serialize';

const running = new Map<string, Child>();

export async function getConfigFilePath(instance: WireproxyInstance) {
  const { configsBasePath } = await getPaths();
  return join(configsBasePath, `${instance.id}.conf`);
}

export function createWireproxyInstance(name?: string): WireproxyInstance {
  const id = nanoid(21);

  return {
    id,
    name: name ?? 'Instance',
    running: false,
    wgConfigPath: '',
    proxies: [],
  };
}

export async function deleteWireproxyInstance(instance: WireproxyInstance) {
  const path = await getConfigFilePath(instance);
  await stopWireproxy(instance);
  await remove(path);
}

export async function launchWireproxy(instance: WireproxyInstance) {
  const config = serializeWireproxyInstance(instance);
  const path = await getConfigFilePath(instance);

  await writeTextFile(path, config, { create: true, mode: 0o644 });

  const cmd = Command.sidecar('binaries/wireproxy', ['-c', path]);
  const child = await cmd.spawn();

  running.set(instance.id, child);
  return child.pid;
}

export async function stopWireproxy(instance: WireproxyInstance) {
  const cmd = running.get(instance.id);
  if (cmd) {
    await cmd.kill();
  }
}
