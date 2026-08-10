import { execSync } from 'node:child_process';
import { mkdir, mkdtemp, rename, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import process from 'node:process';
import { Readable } from 'node:stream';

import { extract } from 'tar';

const defaultVersion = 'v1.1.3';

async function download(version) {
  const tag = version.startsWith('v') ? version : `v${version}`;
  const url = `https://api.github.com/repos/windtf/wireproxy/releases/tags/${tag}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not get wireproxy release for version ${tag}`);
  }

  const releases = await res.json();

  const platform = process.platform === 'win32' ? 'windows' : process.platform;
  const arch = process.arch === 'x64'
    ? 'amd64'
    : process.arch === 'ia32'
      ? '386'
      : process.arch;

  const filename = `wireproxy_${platform}_${arch}.tar.gz`;
  const asset = releases.assets.find((a) => a.name === filename);

  if (!asset) {
    throw new Error(`Could not find a wireproxy asset for ${platform}_${arch}`);
  }

  console.log(`Downloading ${filename} from GitHub releases...`);

  const tmp = await mkdtemp(join(tmpdir(), 'wireproxy-manager-'));
  const filePath = join(tmp, filename);

  const assetRes = await fetch(asset.browser_download_url);
  await writeFile(filePath, Readable.fromWeb(assetRes.body));

  console.log(`Downloaded wireproxy asset!`);

  return filePath;
}

async function main() {
  const [version = defaultVersion] = process.argv.slice(2);
  const filePath = await download(version);
  const targetDir = resolve('src-tauri', 'binaries');

  await mkdir(targetDir, { recursive: true });
  await extract({
    file: filePath,
    cwd: targetDir,
  });

  console.log('Preparing wireproxy as a sidecar...');

  const rustc = execSync('rustc -Vv').toString().trim();
  const host = rustc.match(/host:\s(.*)$/im);
  const triple = host?.at(1);

  if (!host || !triple) {
    throw new Error('Could not get host triple from rustc');
  }

  const extension = process.platform === 'win32' ? '.exe' : '';
  const file = join(targetDir, 'wireproxy');

  await rename(`${file}${extension}`, `${file}-${triple}${extension}`);

  console.log('wireproxy sidecar is ready!');
}

main();
