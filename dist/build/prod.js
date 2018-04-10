'use strict';

var base = require('./base');
var mix = require('laravel-mix');
var merge = require('lodash/merge');
module.exports = function () {
    this.config = {};

    this.run = function () {
        mix.webpackConfig(merge(this.config, base));
    };
};