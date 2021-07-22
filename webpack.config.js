const path = require('path')
/**
 * @description: 拼接路径
 * @param {*} pathname
 */
function resolve(pathname) {
    return path.resolve(__dirname, pathname)
}
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const environment = process.env.NODE_ENV
let mode, entryPath
if (environment === "production") {
    entryPath = 'src/index.ts'
    mode = environment
} else {
    entryPath = 'src/dev.ts'
    mode = 'development'
}
module.exports = {
    entry: resolve(entryPath),
    output: {
        path: resolve('dist'),
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'ru-merge-tree',
    },
    mode,
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
        alias: {
            '@': resolve('./src/'),
        },
    },
    plugins: [
        // new CopyWebpackPlugin([
        // {from: './html/index.html'}
        // ]),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         { from: "./html/index.html" }
        //     ],
        // }),
        new htmlWebpackPlugin({
            template: resolve('./public/index.html')
        }),
        new CleanWebpackPlugin(),
        // new UglifyJsPlugin({
        //     uglifyOptions: {
        //         // 删除console debugger 删除警告
        //         compress: {
        //             // warnings: false,
        //             drop_console: true,//console
        //             drop_debugger: false,
        //             // pure_funcs: ['console.log']//移除console
        //         }
        //     }
        // })
    ],
    devServer: {
        contentBase: resolve('plulic'),
        open: true,
        hot: true,
        hotOnly: true,
        port: 8010,
        host: "127.0.0.1"
    }
}