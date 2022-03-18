const path = require('path')

/**
 * @description: 拼接路径
 * @param {*} pathname
 */
function resolve(pathname) {
  return path.resolve(__dirname, pathname)
}

// 清理打包目录里面的文件
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// 生成html文件
const htmlWebpackPlugin = require('html-webpack-plugin');
const mode = process.env.NODE_ENV
const entry = mode === 'production' ? './src/index.ts' : './src/dev.ts'
module.exports = {
  entry: resolve(entry),
  output: {
    path: resolve('dist'),
    filename: 'index.js',
    library: {
      name: 'fusion-table',
      type: 'umd'
    },
  },
  node: {
    global: true
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
  devtool: 'source-map',
  plugins: [
    // Plugin that simplifies creation of HTML files to serve your bundles
    new htmlWebpackPlugin({
      template: resolve('./public/index.html')
    }),
    // remove build folder file
    new CleanWebpackPlugin(),
  ],
  devServer: {
    contentBase: resolve('public'),
    open: true,
    hot: true,
    hotOnly: true,
    port: 8080,
    host: "127.0.0.1"
  }
}
