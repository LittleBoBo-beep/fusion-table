const path = require('path')

/**
 * @description: 拼接路径
 * @param { string } pathname
 * @return { string } url
 */
function resolve(pathname) {
  return path.resolve(__dirname, pathname)
}

// 清理打包目录里面的文件
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// 生成html文件
const htmlWebpackPlugin = require('html-webpack-plugin');

const mode = process.env.NODE_ENV

const entry = mode === 'production' ? './src/index.ts' : './example/main.ts'
module.exports = {
  entry: resolve(entry),
  output: {
    path: resolve('build'),
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
    new htmlWebpackPlugin({
      template: resolve('./public/index.html')
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    contentBase: resolve('public'),
    open: false,
    hot: true,
    hotOnly: true,
    port: 8080
  }
}
