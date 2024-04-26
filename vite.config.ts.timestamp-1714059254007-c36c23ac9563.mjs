// vite.config.ts
import path from "node:path";
import { defineConfig } from "file:///D:/Edw4rd/workspace/resume/my-vitesse-app/node_modules/.pnpm/vite@5.2.9_@types+node@20.12.7_sass@1.75.0/node_modules/vite/dist/node/index.js";
import Vue from "file:///D:/Edw4rd/workspace/resume/my-vitesse-app/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.2.9_vue@3.4.23/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Components from "file:///D:/Edw4rd/workspace/resume/my-vitesse-app/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.4.23/node_modules/unplugin-vue-components/dist/vite.js";
import AutoImport from "file:///D:/Edw4rd/workspace/resume/my-vitesse-app/node_modules/.pnpm/unplugin-auto-import@0.17.5_@vueuse+core@10.9.0/node_modules/unplugin-auto-import/dist/vite.js";
import UnoCSS from "file:///D:/Edw4rd/workspace/resume/my-vitesse-app/node_modules/.pnpm/unocss@0.58.9_postcss@8.4.38_vite@5.2.9/node_modules/unocss/dist/vite.mjs";
import VueMacros from "file:///D:/Edw4rd/workspace/resume/my-vitesse-app/node_modules/.pnpm/unplugin-vue-macros@2.9.1_@vueuse+core@10.9.0_typescript@5.4.5_vite@5.2.9_vue@3.4.23/node_modules/unplugin-vue-macros/dist/vite.mjs";
import VueRouter from "file:///D:/Edw4rd/workspace/resume/my-vitesse-app/node_modules/.pnpm/unplugin-vue-router@0.8.6_vue-router@4.3.1_vue@3.4.23/node_modules/unplugin-vue-router/dist/vite.mjs";
import { VueRouterAutoImports } from "file:///D:/Edw4rd/workspace/resume/my-vitesse-app/node_modules/.pnpm/unplugin-vue-router@0.8.6_vue-router@4.3.1_vue@3.4.23/node_modules/unplugin-vue-router/dist/index.mjs";
import vueJsx from "file:///D:/Edw4rd/workspace/resume/my-vitesse-app/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.2.9_vue@3.4.23/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { ArcoResolver } from "file:///D:/Edw4rd/workspace/resume/my-vitesse-app/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.4.23/node_modules/unplugin-vue-components/dist/resolvers.js";
var __vite_injected_original_dirname = "D:\\Edw4rd\\workspace\\resume\\my-vitesse-app";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__vite_injected_original_dirname, "src")}/`
    }
  },
  plugins: [
    VueMacros({
      defineOptions: false,
      defineModels: false,
      plugins: {
        vue: Vue({
          script: {
            propsDestructure: true,
            defineModel: true
          }
        })
      }
    }),
    // Vue(),
    vueJsx(),
    // https://github.com/posva/unplugin-vue-router
    VueRouter(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      resolvers: [ArcoResolver()],
      imports: [
        "vue",
        "@vueuse/core",
        VueRouterAutoImports,
        {
          // add any other imports you were relying on
          "vue-router/auto": ["useLink"]
        }
      ],
      dts: true,
      dirs: ["./src/composables"],
      vueTemplate: true
    }),
    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
      resolvers: [ArcoResolver({ sideEffect: true })]
    }),
    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    UnoCSS()
  ],
  worker: {
    format: "es"
  },
  // https://github.com/vitest-dev/vitest
  test: {
    environment: "jsdom"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxFZHc0cmRcXFxcd29ya3NwYWNlXFxcXHJlc3VtZVxcXFxteS12aXRlc3NlLWFwcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcRWR3NHJkXFxcXHdvcmtzcGFjZVxcXFxyZXN1bWVcXFxcbXktdml0ZXNzZS1hcHBcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0VkdzRyZC93b3Jrc3BhY2UvcmVzdW1lL215LXZpdGVzc2UtYXBwL3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxuXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IFZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCBVbm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnXG5pbXBvcnQgVnVlTWFjcm9zIGZyb20gJ3VucGx1Z2luLXZ1ZS1tYWNyb3Mvdml0ZSdcbmltcG9ydCBWdWVSb3V0ZXIgZnJvbSAndW5wbHVnaW4tdnVlLXJvdXRlci92aXRlJ1xuaW1wb3J0IHsgVnVlUm91dGVyQXV0b0ltcG9ydHMgfSBmcm9tICd1bnBsdWdpbi12dWUtcm91dGVyJ1xuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xuaW1wb3J0IHsgQXJjb1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICd+Lyc6IGAke3BhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKX0vYCxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgVnVlTWFjcm9zKHtcbiAgICAgIGRlZmluZU9wdGlvbnM6IGZhbHNlLFxuICAgICAgZGVmaW5lTW9kZWxzOiBmYWxzZSxcbiAgICAgIHBsdWdpbnM6IHtcbiAgICAgICAgdnVlOiBWdWUoe1xuICAgICAgICAgIHNjcmlwdDoge1xuICAgICAgICAgICAgcHJvcHNEZXN0cnVjdHVyZTogdHJ1ZSxcbiAgICAgICAgICAgIGRlZmluZU1vZGVsOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgfSxcbiAgICB9KSxcbiAgICAvLyBWdWUoKSxcbiAgICB2dWVKc3goKSxcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vcG9zdmEvdW5wbHVnaW4tdnVlLXJvdXRlclxuICAgIFZ1ZVJvdXRlcigpLFxuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3VucGx1Z2luLWF1dG8taW1wb3J0XG4gICAgQXV0b0ltcG9ydCh7XG4gICAgICByZXNvbHZlcnM6IFtBcmNvUmVzb2x2ZXIoKV0sXG4gICAgICBpbXBvcnRzOiBbXG4gICAgICAgICd2dWUnLFxuICAgICAgICAnQHZ1ZXVzZS9jb3JlJyxcbiAgICAgICAgVnVlUm91dGVyQXV0b0ltcG9ydHMsXG4gICAgICAgIHtcbiAgICAgICAgICAvLyBhZGQgYW55IG90aGVyIGltcG9ydHMgeW91IHdlcmUgcmVseWluZyBvblxuICAgICAgICAgICd2dWUtcm91dGVyL2F1dG8nOiBbJ3VzZUxpbmsnXSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBkdHM6IHRydWUsXG4gICAgICBkaXJzOiBbJy4vc3JjL2NvbXBvc2FibGVzJ10sXG4gICAgICB2dWVUZW1wbGF0ZTogdHJ1ZSxcbiAgICB9KSxcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS92aXRlLXBsdWdpbi1jb21wb25lbnRzXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICBkdHM6IHRydWUsXG4gICAgICByZXNvbHZlcnM6IFtBcmNvUmVzb2x2ZXIoeyBzaWRlRWZmZWN0OiB0cnVlIH0pXSxcbiAgICB9KSxcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bm9jc3NcbiAgICAvLyBzZWUgdW5vLmNvbmZpZy50cyBmb3IgY29uZmlnXG4gICAgVW5vQ1NTKCksXG4gIF0sXG4gIHdvcmtlcjoge1xuICAgIGZvcm1hdDogJ2VzJyxcbiAgfSxcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3ZpdGVzdC1kZXYvdml0ZXN0XG4gIHRlc3Q6IHtcbiAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLFlBQVk7QUFDbkIsT0FBTyxlQUFlO0FBQ3RCLE9BQU8sZUFBZTtBQUN0QixTQUFTLDRCQUE0QjtBQUNyQyxPQUFPLFlBQVk7QUFDbkIsU0FBUyxvQkFBb0I7QUFaN0IsSUFBTSxtQ0FBbUM7QUFjekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsTUFBTSxHQUFHLEtBQUssUUFBUSxrQ0FBVyxLQUFLLENBQUM7QUFBQSxJQUN6QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLFVBQVU7QUFBQSxNQUNSLGVBQWU7QUFBQSxNQUNmLGNBQWM7QUFBQSxNQUNkLFNBQVM7QUFBQSxRQUNQLEtBQUssSUFBSTtBQUFBLFVBQ1AsUUFBUTtBQUFBLFlBQ04sa0JBQWtCO0FBQUEsWUFDbEIsYUFBYTtBQUFBLFVBQ2Y7QUFBQSxRQUNGLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRixDQUFDO0FBQUE7QUFBQSxJQUVELE9BQU87QUFBQTtBQUFBLElBRVAsVUFBVTtBQUFBO0FBQUEsSUFHVixXQUFXO0FBQUEsTUFDVCxXQUFXLENBQUMsYUFBYSxDQUFDO0FBQUEsTUFDMUIsU0FBUztBQUFBLFFBQ1A7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQTtBQUFBLFVBRUUsbUJBQW1CLENBQUMsU0FBUztBQUFBLFFBQy9CO0FBQUEsTUFDRjtBQUFBLE1BQ0EsS0FBSztBQUFBLE1BQ0wsTUFBTSxDQUFDLG1CQUFtQjtBQUFBLE1BQzFCLGFBQWE7QUFBQSxJQUNmLENBQUM7QUFBQTtBQUFBLElBR0QsV0FBVztBQUFBLE1BQ1QsS0FBSztBQUFBLE1BQ0wsV0FBVyxDQUFDLGFBQWEsRUFBRSxZQUFZLEtBQUssQ0FBQyxDQUFDO0FBQUEsSUFDaEQsQ0FBQztBQUFBO0FBQUE7QUFBQSxJQUlELE9BQU87QUFBQSxFQUNUO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixRQUFRO0FBQUEsRUFDVjtBQUFBO0FBQUEsRUFFQSxNQUFNO0FBQUEsSUFDSixhQUFhO0FBQUEsRUFDZjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
