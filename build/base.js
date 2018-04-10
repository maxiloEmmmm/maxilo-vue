let fs = require('fs');
let mix = require('laravel-mix');
const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
//预渲染
const PrerenderSpaPlugin = require('prerender-spa-plugin');
//html生产
const HtmlWebpackPlugin = require('html-webpack-plugin');
//cmd通知
const NotifierPlugin = require('friendly-errors-webpack-plugin');
//打包系统通知
const WebpackNotifierPlugin = require('webpack-notifier');
//个人环境
const Dotenv = require('dotenv-webpack');
//打包分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let env = {
    //port of hot model
    'process.env.PORT': 19199,
    'process.env.DEBUG': true
};

//user env
try {
    fs.accessSync(resolve('./src/.env'), fs.F_OK);
    let dot_env = new Dotenv({
        path: resolve('./src/.env'),
    });
    let tmp = {};
    let envs = Object.keys(dot_env.definitions).forEach(function (key) {
        tmp[key] = JSON.parse(dot_env.definitions[key]);
    });
    env = _.merge(env, tmp);
} catch (e) {
}


//resolve file system path
function resolve(dir) {
    return path.join(__dirname, '../../../' + dir);
}

//mock support
/*
    if use, copy .mock-example to .mock with dev, hot, watch, watch-poll model
 */
try {
    fs.accessSync(resolve('./src/.mock'), fs.F_OK);
    if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'production_analyzer') {
        mix.js(resolve('./src/mock.js'), process.argv.includes('--hot') ? 'mock.js' : 'js/mock.js');
    }
} catch (e) {
}

let messages = [];
if (process.argv.includes('--hot')) {
    messages.push('You application is running here http://localhost:' + env['process.env.PORT']);
}

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
                        },
                        publicPath: !process.argv.includes('--hot') ? '/assets/' : '/'
                    }
                }
            ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'body',
            chunksSortMode: 'dependency',
            template: "index.html",
            filename: process.argv.includes('--hot') ? 'index.html' : resolve('public/index.html')
        }),
        //remove moment locale, because don.t use
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        //       new PrerenderSpaPlugin(
        //        resolve('public'),
        //  ['/admin/login']
        // )
    ]
};

if (!process.argv.includes('--hot')) {
    configs.output.chunkFilename = 'js/[name].js';
    configs.output.path = resolve("public/assets");
    configs.output.publicPath = "/assets/";

    mix.options({
        resourceRoot: '/assets/'
    });
} else {
    configs.output.publicPath = "http://localhost:" + env['process.env.PORT'] + '/';
    configs.devServer = {
        port: env['process.env.PORT'],
        host: '0.0.0.0'
    };
}

if (process.env.NODE_ENV == 'production_analyzer') {
    configs.plugins.push(new BundleAnalyzerPlugin());
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
        new NotifierPlugin({
            compilationSuccessInfo: {
                messages,
                notes: [
                    'power by maxilo.'
                ]
            },
        }),
        new WebpackNotifierPlugin({
            title: env['process.env.NOTIFIER_TITLE'] ? env['process.env.NOTIFIER_TITLE'] : 'power by maxilo',
            alwaysNotify: env['process.env.NOTIFIER_ALWAYS_NOTIFY'] ? env['process.env.NOTIFIER_ALWAYS_NOTIFY'] : true,
            contentImage: resolve('.NatsumeMio.png')
        })
    ]);

    try {
        fs.accessSync(resolve('./src/.env'), fs.F_OK);
        configs.plugins.push(new Dotenv({
            path: './src/.env',
        }));
    } catch (e) {
    }
}

//copy
mix.copy('node_modules/html5-history-api/history.min.js', 'public/assets/js/html5-history-api.js');

//diy nofification
mix.disableNotifications();

module.exports = configs;


