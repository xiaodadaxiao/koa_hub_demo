const connection = require('../app/database')
class FileService {
    //保存上传头像图片的信息
    async createAvatar(filename, mimetype, size, userId) {
        const statement = ` INSERT INTO avatar (filename,mimetype,size,user_id) VALUES(?,?,?,?) `
        const [result] = await connection.execute(statement, [filename, mimetype, size, userId]);
        return result
    }

    //读取图片信息
    async getAvatarByName(filename) {
        const statement = ` SELECT * FROM avatar WHERE filename=? `
        const [result] = await connection.execute(statement, [filename])
        return result[0]
    }
}

module.exports = new FileService()