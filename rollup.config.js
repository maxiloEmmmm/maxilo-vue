import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import flow from 'rollup-plugin-flow-no-whitespace';
import babel from 'rollup-plugin-babel';
import {uglify} from 'rollup-plugin-uglify';

export default {
    input: 'index.js',
    output: {
        file: 'bundle.js',
        format: 'iife',
        name: 'maxiloVue'
    },
    plugins: [flow(), json(), resolve({
        browser: true,
        // mainFields: ['main, jsnext']
    }), commonjs(), babel({
        exclude: 'node_modules/**'
    }), uglify()],
}