import { defineConfig } from 'vite';
import Components from 'unplugin-react-components/vite'
import { MuiResolver } from "unplugin-react-components"
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';


const extensions = [
  '.web.tsx',
  '.web.ts',
  '.web.jsx',
  '.web.js',
  '.tsx',
  '.ts',
  '.jsx',
  '.js',
  '.json',
];

export default defineConfig({
  plugins: [tailwindcss(), react(), Components({

    resolvers: [MuiResolver()], dts: true
  })],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    __DEV__: JSON.stringify(true),
    global: 'window',
  },
  resolve: {
    alias: [
      { find: /^react-native$/, replacement: 'react-native-web' },
    ],
    extensions,
  },
  optimizeDeps: {
    esbuildOptions: {
      resolveExtensions: extensions,
      jsx: 'automatic',
      loader: { '.js': 'jsx' },
    },
  },
});
