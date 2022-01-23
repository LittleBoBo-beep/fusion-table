const resolve = require('./build/util/index')
// 清理打包目录里面的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 生成html文件
const htmlWebpackPlugin = require('html-webpack-plugin');
const dev = require('./build/dev')
const prod = require('./build/prod')
let webpackConfig = null
if (process.env.NODE_ENV === "production") {
    // entryPath = 'src/index.ts'
    // mode = environment
    webpackConfig = prod
} else {
    // entryPath = 'src/dev.ts'
    // mode = 'development'
  webpackConfig = dev
}
module.exports = {
    ...webpackConfig,
    output: {
        path: resolve('dist'),
        filename: 'index.js',
        // libraryTarget: 'umd',
        library: 'fusion-table',
    },
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
        port: 8080,
        host: "127.0.0.1"
    }
}
