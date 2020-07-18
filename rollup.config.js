import nodeResolve from '@rollup/plugin-node-resolve'
import { terser } from "rollup-plugin-terser"

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'build/index.js',
            format: 'cjs'
        }
    ],
    plugins: [
        nodeResolve({
            jsnext: true
        }),
        terser()
    ]
}