import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import flow from 'rollup-plugin-flow-no-whitespace';
import babel from 'rollup-plugin-babel';
// import {uglify} from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';

const ext = ['vue', 'vue-i18n', 'vue-router', 'vuex', 'axios']
const out_ext = ['vue', 'vue-i18n', 'vue-router', 'vuex']
export default {
    input: {
        normal: 'index.js',
        out: 'index-without-lib.js'
    }[process.env.OUT ? 'out' : 'normal'],
    output: {
        file: {
            full: `dist/maxilo-vue${process.env.OUT ? '-out' : ''}.min.js`,
            runtime: `dist/main${process.env.OUT ? '-out' : ''}.min.js`
        }[process.env.TARGET],
        format: 'umd',
        name: 'maxiloVue',
    },
    external: {
        full: [],
        runtime: process.env.OUT ? out_ext : ext
    }[process.env.TARGET],
    plugins: [flow(), json(), resolve({
        browser: true,
        // mainFields: ['main, jsnext']
    }), commonjs(), babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true
    }), replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    })],
}