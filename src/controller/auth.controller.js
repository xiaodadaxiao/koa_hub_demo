
class AuthController {
    login(ctx, next) {
        ctx.body = '登录成功...'
    }
}

module.exports = new AuthController()