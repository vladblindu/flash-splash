import nodeResolve from '@rollup/plugin-node-resolve'

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'build/bundle.js',
            format: 'cjs'
        }
    ],
    plugins: [nodeResolve({
        jsnext: true
    })]
}