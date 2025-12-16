// vite.config.ts
import { resolve } from "path";
import vue from "file:///G:/Project/vite-lint/vite-auto/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { defineConfig } from "file:///G:/Project/vite-lint/vite-auto/node_modules/vite/dist/node/index.js";
import { viteMockServe } from "file:///G:/Project/vite-lint/vite-auto/node_modules/vite-plugin-mock/dist/index.mjs";
var __vite_injected_original_dirname = "G:\\Project\\vite-lint\\vite-auto";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: "mock",
      enable: true
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "src")
    }
  },
  server: {
    // 在开发环境中不设置proxy，让mockjs正常工作
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJHOlxcXFxQcm9qZWN0XFxcXHZpdGUtbGludFxcXFx2aXRlLWF1dG9cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkc6XFxcXFByb2plY3RcXFxcdml0ZS1saW50XFxcXHZpdGUtYXV0b1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRzovUHJvamVjdC92aXRlLWxpbnQvdml0ZS1hdXRvL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXG5cbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IHZpdGVNb2NrU2VydmUgfSBmcm9tICd2aXRlLXBsdWdpbi1tb2NrJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuICAgIHZpdGVNb2NrU2VydmUoe1xuICAgICAgbW9ja1BhdGg6ICdtb2NrJyxcbiAgICAgIGVuYWJsZTogdHJ1ZSxcbiAgICB9KSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXG4gICAgfSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgLy8gXHU1NzI4XHU1RjAwXHU1M0QxXHU3M0FGXHU1ODgzXHU0RTJEXHU0RTBEXHU4QkJFXHU3RjZFcHJveHlcdUZGMENcdThCQTltb2NranNcdTZCNjNcdTVFMzhcdTVERTVcdTRGNUNcbiAgICAvLyBwcm94eToge1xuICAgIC8vICAgJy9hcGknOiB7XG4gICAgLy8gICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcsXG4gICAgLy8gICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAvLyAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKSxcbiAgICAvLyAgIH0sXG4gICAgLy8gfSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9SLFNBQVMsZUFBZTtBQUU1UyxPQUFPLFNBQVM7QUFDaEIsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxxQkFBcUI7QUFKOUIsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osY0FBYztBQUFBLE1BQ1osVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLElBQ1YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsSUFDL0I7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBU1I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
