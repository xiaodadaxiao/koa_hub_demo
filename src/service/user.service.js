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
}
module.exports = new UserService()