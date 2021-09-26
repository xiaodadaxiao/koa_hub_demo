const jwt = require('jsonwebtoken')

//导入私钥
const { PRIVATE_KEY } = require('../app/config')

class AuthController {
    login(ctx, next) {
        const { id, name } = ctx.user;
        //将用户id和name写入token。私钥签名
        const token = jwt.sign({ id, name }, PRIVATE_KEY, {
            expiresIn: 60 * 60 * 24 * 1,//有效时间，单位秒
            algorithm: 'RS256',//算法
        })
        ctx.body = { id, name, token }
    }
}

module.exports = new AuthController()