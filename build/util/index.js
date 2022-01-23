const path = require('path')
/**
 * @description: 拼接路径
 * @param {*} pathname
 */
module.exports = function resolve(pathname) {
  return path.resolve(__dirname, pathname)
}
