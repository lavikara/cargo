import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
    baseUrl: "http://localhost:1759",
  },
  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});

// const { defineConfig } = require('cypress')

// module.exports = defineConfig({
//   component: {
//     devServer: {
//       framework: 'vue',
//       bundler: 'vite',
//     },
//   },
// })

// import { defineConfig } from 'cypress'
// import vitePreprocessor from 'cypress-vite'

// export default defineConfig({
//   e2e: {
//     setupNodeEvents(on) {
//       on('file:preprocessor', vitePreprocessor())
//     },
//   },
// })

// import { defineConfig } from "cypress";
// import vitePreprocessor from "cypress-vite";

// export default defineConfig({
//   e2e: {
//     specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
//     baseUrl: "http://localhost:1759",
//     setupNodeEvents(on) {
//       on("file:preprocessor", vitePreprocessor());
//     },
//   },

//   component: {
//     devServer: {
//       framework: "vue",
//       bundler: "vite",
//     },
//   },
// });
