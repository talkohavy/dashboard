import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { extname, relative } from 'path';
import { glob } from 'glob';
import { defineConfig } from 'vite';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import react from '@vitejs/plugin-react-swc';

const port = +(process.env.VITE_PORT ?? 3000);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), libInjectCss()], // <--- 💡 The dts plugin would also work to exclude: ['src'] or use a different Typescript config file for the build process.
  server: {
    port, // Note if this port is already being used, Vite will automatically try the next available port so this may not be the actual port the server ends up listening on.
    strictPort: true, // default is false. Set to true to exit if port is already in use, instead of automatically trying the next available port.
    open: process.env.NODE_ENV === 'development', // default is false. Automatically opens the app in the browser on server start. You can specify a URL's pathname i.e a string instead of true, and it will open that page.
    // watch: { usePolling: true }, // When running Vite on Windows Subsystem for Linux (WSL) 2, if the project folder resides in a Windows filesystem, you'll need to set this option to { usePolling: true }. This is due to a WSL2 limitation with the Windows filesystem. The Vite server watcher skips .git/ and node_modules/ directories by default.
  },
  build: {
    copyPublicDir: false, // <--- make this `false` so that it wouldn't copy the vote.svg file from the public folder.
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, 'lib/main.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      input: Object.fromEntries(
        glob
          .sync('lib/**/*.{ts,tsx}', {
            ignore: ['lib/**/*.d.ts'],
          })
          .map((file) => [
            // Step 1: Turn the name of the entry point 'lib/nested/foo.ts' into 'nested/foo'
            relative('lib', file.slice(0, file.length - extname(file).length)),
            // Step 2: Turn the absolute path to the entry file 'lib/nested/foo.ts' to '/project/lib/nested/foo.ts'
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
});
