const fs = require('fs')
const path = require('path')
const { AVATAR_PATH } = require('../constants/file-path')
const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const { APP_HOST, APP_PORT } = require('../app/config')
class FileController {

    //保存上传图片的信息
    async saveAvatarInfo(ctx, next) {
        //获得图片的信息（在前面中间件保存后）
        const { filename, mimetype, size } = ctx.req.file;
        const userId = ctx.userInfo.id
        try {
            //保存图片信息
            await fileService.createAvatar(filename, mimetype, size, userId);
            //修改用户数据的头像的url（avatar_url）
            const avatarUrl = `${APP_HOST}:${APP_PORT}/upload/avatar/${filename}`
            //保存最新头像链接到用户信息
            await userService.updateAvatarUrl(avatarUrl, userId);
            ctx.body = {
                state: 200,
                message: "上传头像成功",
                avatarUrl
            }
        } catch (e) {
            ctx.app.emit('error', new Error('上传头像失败', ctx))
        }
    }

    //获得某张头像图片
    async getAvatarByName(ctx, next) {
        const filename = ctx.params.filename;
        try {
            //读取图片信息
            const avatarInfo = await fileService.getAvatarByName(filename);
            if (!avatarInfo) throw new Error();
            ctx.response.set('content-type', avatarInfo.mimetype);
            ctx.body = fs.createReadStream(path.join(AVATAR_PATH, filename))
        } catch (e) {
            return ctx.app.emit('error', new Error('无法获取头像'), ctx)
        }

    }
}

module.exports = new FileController()