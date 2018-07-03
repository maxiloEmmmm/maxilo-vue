const path = require('path');

function resolve(dir) {
    return path.join(__dirname, '../../../' + dir);
}

module.exports = {
    resolve: function (dir, pathTo = false){
        // '../../../' for npm nodemodules.
        return path.join(pathTo ? pathTo : __dirname, '../../../' + dir);
    }
};