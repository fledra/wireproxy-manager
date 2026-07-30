import process from 'node:process';

import ui from '@nuxt/ui/vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

const host = process.env.TAURI_DEV_HOST;

export default defineConfig(async () => ({
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      ignored: ['**/src-tauri/**'],
    },
  },
  plugins: [
    vue(),
    ui({
      autoImport: {
        dts: './src/auto-imports.d.ts',
        dtsMode: 'overwrite',
      },
      components: {
        dts: './src/components.d.ts',
        syncMode: 'overwrite',
      },
      ui: {
        colors: {
          primary: 'sky',
          secondary: 'teal',
          neutral: 'zinc',
        },
      },
      router: false,
    }),
  ],
}));
