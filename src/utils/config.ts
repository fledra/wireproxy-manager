import type { WireproxyInstance, WireproxyManager } from '../types';

import { appDataDir, join } from '@tauri-apps/api/path';
import { exists, mkdir, readDir, readTextFile, remove, writeTextFile } from '@tauri-apps/plugin-fs';

import { createWireproxyInstance, getConfigFilePath } from './wireproxy';

async function ensureDir(path: string) {
  const dir = await exists(path);
  if (!dir) {
    await mkdir(path, { recursive: true });
  }
  return path;
}

export async function getPaths() {
  const base = await appDataDir();
  await ensureDir(base);

  const configPath = await join(base, 'wireproxy-manager.config.json');
  const configsBasePath = await join(base, 'configs');

  await ensureDir(configsBasePath);

  return {
    configPath,
    configsBasePath,
  };
}

export async function readConfig(): Promise<WireproxyManager> {
  const paths = await getPaths();

  const content = await readTextFile(paths.configPath);
  const config: WireproxyManager = JSON.parse(content);

  if (!(await exists(paths.configsBasePath))) {
    await mkdir(paths.configsBasePath);
  }

  const entries = await readDir(paths.configsBasePath);

  for (const entry of entries) {
    const id = entry.name.slice(0, entry.name.indexOf('.'));
    let instance = config.instances.find((instance) => instance.id === id);

    if (!instance) {
      instance = createWireproxyInstance();
      instance.id = id;
    }

    const path = await getConfigFilePath(instance);
    await remove(path);
  }

  config.instances = config.instances.map((instance) => ({ ...instance, running: false }));

  return config;
}

function configReplacer(key: string, value: unknown) {
  if (key === 'instances' && Array.isArray(value)) {
    return value.map((v) => ({ ...v, running: undefined }));
  }
  return value;
}

export async function writeConfig(instances: WireproxyInstance[]) {
  const paths = await getPaths();
  const config = {
    instances: [...instances],
    ts: new Date().toISOString(),
  } satisfies WireproxyManager;

  await writeTextFile(
    paths.configPath,
    JSON.stringify(config, configReplacer, 2),
    { create: true, mode: 0o644 },
  );
}
