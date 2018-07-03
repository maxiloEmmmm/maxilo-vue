let fs = require('fs');
let mix = require('laravel-mix');
const _ = require('lodash');
const webpack = require('webpack');
//预渲染
const PrerenderSpaPlugin = require('prerender-spa-plugin');
//html生产
//cmd通知
//打包系统通知
const WebpackNotifierPlugin = require('webpack-notifier');
const utils = require('./utils');
//edit default config
const configs = {
    output: {},
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [{
            test: /\.(swf)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]?[hash]',
                publicPath: process.argv.includes('--hot') ? '/' : 'assets'
            }
        }, {
            test: /\.(png|jpe?g|gif)$/,
            loaders: [
                {
                    loader: 'file-loader',
                    options: {
                        name: path => {
                            if (! /node_modules|bower_components/.test(path)) {
                                return 'images/[hash].[ext]';
                            }

                            return 'images/vendor/' + path
                                .replace(/\\/g, '/')
                                .replace(
                                    /((.*(node_modules|bower_components))|images|image|img|assets)\//g, ''
                                ) + '?[hash]';
                        }
                    }
                }
            ]
            }, {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'image-webpack-loader',
                enforce: 'pre',
            },]
    },
    plugins: [
        //remove moment locale, because don.t use
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)

    ]
};

if (!process.argv.includes('--hot')) {
    configs.output.chunkFilename = 'js/[name].js';
    configs.output.path = utils.resolve("public/assets");
    configs.output.publicPath = "/assets/";

    mix.options({
        resourceRoot: '/assets/'
    });
} else {
    configs.devServer = {
        host: '0.0.0.0'
    };
    configs.output.path = '/';
    mix.setPublicPath('/');
}

if (process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'production_analyzer') {
    configs.output.filename = '[name].[hash].js';
    configs.output.chunkFilename = 'js/[chunkhash].js';
} else {
    // configs.module.rules.push({
    //     test: /\.(js|vue)$/,
    //     loader: 'eslint-loader',
    //     enforce: 'pre',
    //     include: [resolve('src'), resolve('test')],
    //     options: {
    //         formatter: require('eslint-friendly-formatter'),
    //         emitWarning: true
    //     }
    // });

    configs.plugins.push(...[
        new WebpackNotifierPlugin({
            title: 'power by maxilo',
            contentImage: path.join(__dirname, '.NatsumeMio.png')
        })
    ]);
}

//copy

//diy nofification
mix.disableNotifications();

module.exports = configs;


