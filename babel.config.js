module.exports = {
  presets: [
    ["@babel/preset-env",{
      "useBuiltIns": "usage",
      "corejs": { 
        "version": 3, 
        "proposals": true 
      }
    }]
  ],
  plugins: [["@babel/plugin-transform-runtime", {
    "regenerator": false
  }]],
  exclude: [
    "./core/mocks/mock.js",
  ]
}
