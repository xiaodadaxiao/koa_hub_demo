const Multer = require('koa-multer')
const { AVATAR_PATH } = require('../constants/file-path')
const avaterMulter = Multer({
    dest: AVATAR_PATH
})
const handleAvatar = avaterMulter.single('avatar')


module.exports = {
    handleAvatar
}