module.exports = {
  presets: [
    ["@babel/env"]
  ],
  plugins: [["@babel/plugin-transform-runtime", {
    corejs: 3
  }]],
  exclude: [
    "./core/mocks/mock.js",
  ]
}