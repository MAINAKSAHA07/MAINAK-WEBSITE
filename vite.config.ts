import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // New URL each build so /assets/*.pdf links bypass browser + CDN cache after you replace the file
    __RESUME_ASSET_VERSION__: JSON.stringify(Date.now().toString()),
  },
});
