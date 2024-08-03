import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const port = +(process.env.VITE_PORT ?? 3000) 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: port, // Note if this port is already being used, Vite will automatically try the next available port so this may not be the actual port the server ends up listening on.
    strictPort: true, // default is false. Set to true to exit if port is already in use, instead of automatically trying the next available port.
    open: process.env.NODE_ENV === 'development', // default is false. Automatically opens the app in the browser on server start. You can specify a URL's pathname i.e a string instead of true, and it will open that page.
    // watch: { usePolling: true }, // When running Vite on Windows Subsystem for Linux (WSL) 2, if the project folder resides in a Windows filesystem, you'll need to set this option to { usePolling: true }. This is due to a WSL2 limitation with the Windows filesystem. The Vite server watcher skips .git/ and node_modules/ directories by default.
  },
})
