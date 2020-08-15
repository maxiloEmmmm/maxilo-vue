
module.exports = {
  presets: [
    ["@babel/env"],
    '@vue/babel-preset-jsx'
  ],
  plugins: [["@babel/plugin-transform-runtime", {
    corejs: 3
  }]],
}