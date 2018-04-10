import "babel-polyfill";
let dev = require('./dev');
let prod = require('./prod');
let mix = require('laravel-mix');
module.exports = function(){


    this.add = function(){
        mix.js(...arguments);
    }
    
    this.run = function(){
        if (process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'production_analyzer') {
            (new prod).run();
        } else {
            (new dev).run();
        }
    };
};