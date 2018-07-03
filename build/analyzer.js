let mix = require('laravel-mix');
let merge = require('lodash/merge');
let base = require('./base');
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = function () {
    this.config = {
    };

    this.run = function (base, v) {
        base.plugins.push(new BundleAnalyzerPlugin());
        mix.webpackConfig(merge(this.config, base));
    };
}