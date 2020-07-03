import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import babel from "rollup-plugin-babel"

export default {
    input: 'tests/__fixtures__/test-setup.js',
    output: [
        {
            file: 'tests/__fixtures__/bundle.js',
            format: 'iife'
        }
    ],
    plugins: [commonjs(), nodeResolve(), babel()]
}