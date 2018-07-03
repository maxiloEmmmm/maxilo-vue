let mix = require('laravel-mix');
let merge = require('lodash/merge');
let utils = require('./utils');
module.exports = function () {
    this.config = {

    };

    this.plugins = function(base, v){
        if(v.prePaths.length != 0) {
            base.plugins.push(new PrerenderSpaPlugin(
                utils.resolve('public'),
                v.prePaths
            ));
        }
    };

    this.run = function (base, v) {
        this.plugins(base, v);
        mix.webpackConfig(merge(this.config, base));
    };
}