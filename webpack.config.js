const path = require('path')

module.exports = {
    // entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: 'css-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', 'css']
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    }
}