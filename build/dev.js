let base = require('./base');
let mix = require('laravel-mix');
let merge = require('lodash/merge');
module.exports = function () {
    this.config = {

    };

    this.run = function () {
        mix.webpackConfig(merge(this.config, base));
    };
}