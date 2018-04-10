let build = require('./dist/build');
let buildInstance = new build;

buildInstance.add('./src/index.js', 'js/index.js');
buildInstance.run();



