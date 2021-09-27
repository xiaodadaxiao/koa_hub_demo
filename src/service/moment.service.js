//用户动态相关数据库操作
const connection = require('../app/database')

/* 公共sql片段 */
//查询动态
const select_sql = `
            SELECT 
                m.id id,m.content,m.createAt createTime, m.updateAt updateTime, 
	            JSON_OBJECT('id',u.id,'name',u.name) user
            FROM moment m 
            LEFT JOIN  users u ON m.user_id=u.id
`


class MomentService {
    //创建动态
    async create(id, content) {
        const statement = `  INSERT INTO moment (user_id,content) VALUES (?,?)`
        const result = await connection.execute(statement, [id, content]);
        return result[0];
    }
    //查询单条动态
    async getDetailById(id) {
        const statement = `
            ${select_sql}
            WHERE m.id=?;`
        const result = await connection.execute(statement, [id]);
        return result[0];
    }
    //查询多条动态
    async getDetailList(offset, size) {
        const statement = `
            ${select_sql}
            LIMIT ?,?;`
        const result = await connection.execute(statement, [offset, size]);
        return result[0]
    }
    //修改动态
    async update(id, content) {
        const statement = `UPDATE  moment SET content=? WHERE id=? ;`;
        const result = await connection.execute(statement, [content, id]);
        return result[0];
    }
    //删除动态
    async remove(id) {
        const statement = `DELETE FROM moment WHERE id=?`
        const result = await connection.execute(statement, [id]);
        return result[0]
    }
}
module.exports = new MomentService();