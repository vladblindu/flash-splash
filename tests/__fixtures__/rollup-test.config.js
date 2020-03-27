import json from '@rollup/plugin-json'

export default {
    input: 'tests/__fixtures__/test-setup.js',
    output: [
        {
            file: 'tests/__fixtures__/bundle.js',
            format: 'iife'
        }
    ],
    plugins: [json()]
}