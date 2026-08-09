import type { WireproxyInstance, WireproxyManager } from '../types';

import { appDataDir, join } from '@tauri-apps/api/path';
import { exists, mkdir, readDir, readTextFile, remove, writeTextFile } from '@tauri-apps/plugin-fs';

import { createWireproxyInstance, getConfigFilePath } from './wireproxy';

export async function getPaths() {
  const configPath = await join(await appDataDir(), 'wireproxy-manager.config.json');
  const configsBasePath = await join(await appDataDir(), 'configs');

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

export async function writeConfig(instances: WireproxyInstance[]) {
  const paths = await getPaths();
  const config = {
    instances: [...instances],
    ts: new Date().toISOString(),
  } satisfies WireproxyManager;

  await writeTextFile(
    paths.configPath,
    JSON.stringify(config, undefined, 2),
    { create: true, mode: 0o644 },
  );
}
