const path = require('path')
/**
 * @description: 拼接路径
 * @param {*} pathname
 */
function resolve(pathname) {
    return path.resolve(__dirname, pathname)
}
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    entry: resolve("src/index.ts"),
    output: {
        path: resolve('dist'),
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'ru-merge-tree',
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.less', '.css'],
    },
    plugins: [new CleanWebpackPlugin()]
}
