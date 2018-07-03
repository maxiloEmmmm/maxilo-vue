let dev = require('./dev');
let prod = require('./prod');
let analyzer = require('./analyzer');
let mix = require('laravel-mix');
let base = require('./base');
let path = require('path');
let utils = require('./utils');
let HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = function(){
    this.publicDir = null;
    this.messages = [];
    this.hot = process.argv.includes('--hot');
    this.lib = false;
    this._indexOutputDir = utils.resolve('public/index.html');
    Object.defineProperty(this, 'indexOutputDir', {
        get(){
            return this._indexOutputDir;
        },
        set(v){
            if(this.hot) {return ;}
            this._indexOutputDir = v
        }
    });

    this.add = function(){
        mix.js(...arguments);
    };

    this.addMessage = function(v){
        this.messages.push(v);
    };

    this.setPublicDir = function(v){
        if (this.hot) {return ;}
        base.output.path = v;
    };

    this.setPublicPath = function (v) {
        if (this.hot) { return; }
        base.output.publicPath = v;
        mix.options({
            resourceRoot: v
        });
    };

    this.prePaths = [];

    this.preRender = function (paths) {
        if (Array.isArray(paths)) {
            this.prePaths.push(...paths);
        } else {
            this.prePaths.push(paths);
        }
    }

    this.repairLib = function(){
        if(!this.lib) {
            mix.copy('node_modules/html5-history-api/history.min.js', 'public/assets/js/html5-history-api.js');
        }
    };

    this.resolve = function(obj){
        Object.keys(obj).forEach(v => {
            base.resolve.alias[v] = obj[v];
        });
    };

    var makeHtmlEntryDir = function(){
        if (!this.lib) {
            base.plugins.push(new HtmlWebpackPlugin({
                inject: 'body',
                template: "index.html",
                chunksSortMode: function (a, b) {
                    if (a.names[0] == '/mock') { console.log(1); return false; }
                    if (b.names[0] == '/mock') { console.log(11); return true; }
                    return true;
                },
                filename: this.hot ? 'index.html' : this.indexOutputDir
            }));
        }
    }.bind(this);

    this.doLib = function(){
        if (this.lib) {
            base.output.filename = '[name].js';
            base.output.path = path.join(__dirname, (this.lib == 1 ? '' : '../../') + '../public/assets');
        }
    }

    this.run = function(){
        let params = {
            publicDir: this.publicDir,
            messages: this.messages,
            prePaths: this.prePaths
        };
        makeHtmlEntryDir();
        this.repairLib();
        this.doLib();
        if (process.env.NODE_ENV == 'production') {
            (new prod).run(base, params);
        } else if (process.env.NODE_ENV == 'production_analyzer'){
            (new analyzer).run(base);
        }else{
            (new dev).run(base, params);
        }
        Mix.listen('configReady', function (config) {
            let keys = [];
            config.module.rules.forEach((rule, key) => {
                if (rule.test.toString() == '/(\\.(png|jpe?g|gif)$|^((?!font).)*\\.svg$)/') {
                    keys.push(key);
                }
            });
            config.module.rules = config.module.rules.filter(($v, k) => !keys.includes(k))
        });
    };
};