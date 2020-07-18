const path = require('path')

module.exports = [
    'var', 'commonjs', 'umd', 'amd'
].map(target => ({
    mode: 'development',
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.' + target + '.js',
        library: 'flashSplash',
        libraryTarget: target
    },
    optimization: {
        minimize: true
    }
}))