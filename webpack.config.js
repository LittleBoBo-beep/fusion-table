const path = require('path')
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
    entry: path.resolve(__dirname, 'src/index.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'ru-merge-tree',
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
        extensions: ['.ts', '.js', '.less', '.css']
    },
    plugins: [
        // new CopyWebpackPlugin([
        // {from: './html/index.html'}
        // ]),
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
    ]
}