// Plugins
import Vue from "@vitejs/plugin-vue"
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify"
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js"
import pkg from "./package.json"
import strip from "@rollup/plugin-strip"

// Utilities
import { defineConfig } from "vite"
import replace from "./build_utils/replace.js"
import { resolve } from "node:path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      isProduction: true,
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify(),
    strip(),
    cssInjectedByJsPlugin(),
  ],
  build: {
    sourcemap: true,
    minify: false,
    lib: {
      formats: ["es"],
      entry: resolve(__dirname, "src/index.mts"),
      name: "CloseableTab",
      fileName: "closeable-tab",
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.peerDependencies),
        /node_modules/,
      ],
      makeAbsoluteExternalsRelative: true,
      output: {
        plugins: [
          replace({
            from: /"\.\.\/node_modules\/vuetify\/lib\/components\/([^\/]+)[^"]+"/g,
            to: '"vuetify/components/$1"',
          }),
        ],
      },
    },
  },
})
