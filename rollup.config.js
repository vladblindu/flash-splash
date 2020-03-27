import json from '@rollup/plugin-json'
//import multiInput from 'rollup-plugin-multi-input'

export default {
    input: 'index.js',
    output: [
        {
            file: 'build/bundle.js',
            format: 'cjs'
        }
    ],
    plugins: [json()]
}