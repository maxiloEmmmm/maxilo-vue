'use strict';

require('babel-polyfill');

var dev = require('./dev');
var prod = require('./prod');
var mix = require('laravel-mix');
module.exports = function () {

    this.add = function () {
        mix.js.apply(mix, arguments);
    };

    this.run = function () {
        if (process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'production_analyzer') {
            new prod().run();
        } else {
            new dev().run();
        }
    };
};