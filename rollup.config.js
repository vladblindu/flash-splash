import nodeResolve from '@rollup/plugin-node-resolve'
import { terser } from "rollup-plugin-terser"

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/index.cjs.js',
            format: 'cjs'
        },
        {
            file: 'dist/index.js',
            format: 'iife',
            name: "flashSplash"
        }
    ],
    plugins: [
        nodeResolve({
            jsnext: true
        }),
        terser()
    ]
}