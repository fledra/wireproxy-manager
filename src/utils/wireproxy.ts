import type { WireproxyInstance } from '../types';

import { join } from '@tauri-apps/api/path';
import { remove, writeTextFile } from '@tauri-apps/plugin-fs';
import { nanoid } from 'nanoid';

import { getPaths } from './config';
import { serializeWireproxyInstance } from './serialize';

export async function getConfigFilePath(instance: WireproxyInstance) {
  const { configsBasePath } = await getPaths();
  return join(configsBasePath, `${instance.id}.conf`);
}

export function createWireproxyInstance(name?: string): WireproxyInstance {
  const id = nanoid();

  return {
    id,
    name: name ?? 'Instance',
    running: false,
    wireproxyPath: '',
    wgConfigPath: '',
    proxies: [],
  };
}

export async function deleteWireproxyInstance(instance: WireproxyInstance) {
  const path = await getConfigFilePath(instance);
  await remove(path);
}
