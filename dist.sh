npx babel build --out-dir dist/build --presets=env,stage-2  --plugins=transform-vue-jsx,transform-runtime &&
npx babel core --out-dir dist/core --presets=env,stage-2  --plugins=transform-vue-jsx,transform-runtime &&
npx babel mocks --out-dir dist/mocks --presets=env,stage-2  --plugins=transform-vue-jsx,transform-runtime &&
npx babel index.js --out-file dist/index.js  --presets=env,stage-2  --plugins=transform-vue-jsx,transform-runtime