//导入node 自带加密模块
const crypto = require('crypto')

const setMD5 = (password) => {
    const md5 = crypto.createHash('md5');
    const result = md5.update(password).digest('hex')//digest('hex') 设置为十六进制
    return result;
}

module.exports = {
    setMD5,
}