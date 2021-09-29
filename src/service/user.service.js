const connection = require('../app/database')
class UserService {
    //创建用户
    async create(userInfo) {
        const { name, password } = userInfo;
        const statement = `INSERT INTO users (name,password) VALUES (?,?);`
        //数据库操作，添加用户
        const result = await connection.execute(statement, [name, password]);
        return result
    }
    //根据用户名查询信息
    async getUserByName(name) {
        const statement = `SELECT * FROM users WHERE name=?;`;
        const result = await connection.execute(statement, [name]);
        return result[0];
    }
    //更新用户头像 url
    async updateAvatarUrl(avatarURL, userId) {
        const statement = `UPDATE users SET avatar_url = ? WHERE id = ?;`;
        const result = await connection.execute(statement, [avatarURL, userId]);
        return result;
    }
}
module.exports = new UserService()