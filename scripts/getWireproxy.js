import { execSync } from 'node:child_process';
import { mkdir, mkdtemp, rename, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, join, resolve } from 'node:path';
import process from 'node:process';
import { Readable } from 'node:stream';

import { extract } from 'tar';

const defaultVersion = 'v1.1.3';

const wireproxyAssets = {
  'x86_64-unknown-linux-gnu': 'linux_amd64',
  'aarch64-unknown-linux-gnu': 'linux_arm64',
  'i686-unknown-linux-gnu': 'linux_386',
  'x86_64-pc-windows-msvc': 'windows_amd64',
  'aarch64-pc-windows-msvc': 'windows_arm64',
  'i686-pc-windows-msvc': 'windows_386',
  'x86_64-apple-darwin': 'darwin_amd64',
  'aarch64-apple-darwin': 'darwin_arm64',
};

function getTargetTriple() {
  let target = process.env.TAURI_TARGET;

  if (!target) {
    const rustc = execSync('rustc -Vv').toString().trim();
    const host = rustc.match(/host:\s(.*)$/im);
    const triple = host?.at(1);

    if (!host || !triple) {
      throw new Error('Could not get host triple from rustc');
    }

    target = triple;
  }

  return target;
}

async function downloadWireproxy(version, { target, cwd }) {
  const tag = version.startsWith('v') ? version : `v${version}`;
  const url = `https://api.github.com/repos/windtf/wireproxy/releases/tags/${tag}`;
  const fetchOptions = {
    headers: {
      ...(process.env.GITHUB_TOKEN && { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }),
    },
  };

  const res = await fetch(url, fetchOptions).catch(console.error);

  if (!res || !res.body) {
    throw new Error(`Could not get wireproxy release for version ${tag}\n${res.status}: ${res.statusText}`);
  }

  const releases = await res.json();
  const filename = `wireproxy_${wireproxyAssets[target]}.tar.gz`;
  const asset = releases.assets.find((a) => a.name === filename);

  if (!asset) {
    throw new Error(`Could not find a wireproxy asset for ${target}`);
  }

  console.log(`Downloading ${filename} from GitHub releases...`);

  const filePath = join(cwd, filename);
  const assetRes = await fetch(asset.browser_download_url, fetchOptions).catch(console.error);

  if (!assetRes) {
    throw new Error(`Could not get wireproxy release for version ${tag}\n${res.status}: ${res.statusText}`);
  }

  await writeFile(filePath, Readable.fromWeb(assetRes.body));

  console.log(`Downloaded wireproxy asset!`);

  return filePath;
}

async function main() {
  const [version = defaultVersion] = process.argv.slice(2);
  const target = getTargetTriple();
  const tmp = await mkdtemp(join(tmpdir(), 'wireproxy-manager-'));

  const filePath = await downloadWireproxy(version, { target, cwd: tmp });
  const targetDir = resolve('src-tauri', 'binaries');

  console.log(`Preparing sidecar for target ${target}`);

  await mkdir(targetDir, { recursive: true });
  await extract({ file: filePath, cwd: targetDir });

  const extension = process.platform === 'win32' ? '.exe' : '';
  const file = join(targetDir, 'wireproxy');
  const targetFile = `${file}-${target}${extension}`;

  await rename(`${file}${extension}`, targetFile);
  await rm(tmp, { recursive: true });

  console.log(`Sidecar ${basename(targetFile)} is ready!`);
}

main();
