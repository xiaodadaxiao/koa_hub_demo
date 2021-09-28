//用户动态相关数据库操作
const connection = require('../app/database')

/* 公共sql片段 */
//查询动态
const select_sql = `
            SELECT 
                m.id id,m.content,m.createAt createTime, m.updateAt updateTime, 
	            JSON_OBJECT('id',u.id,'name',u.name) user,
                (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) commentCount
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
    //判断动态是否有某个标签
    async hasLabelById(momentId, labelId) {
        console.log(momentId, labelId);
        const statement = `SELECT * FROM moment_label WHERE moment_id=? AND label_id=?`;
        const [result] = await connection.execute(statement, [momentId, labelId]);
        console.log(result);
        return result[0] ? true : false
    }
    //添加标签
    async addLabel(momentId, labelId) {
        const statement = `  INSERT INTO moment_label (moment_id,label_id) VALUES (?,?)`
        const [result] = await connection.execute(statement, [momentId, labelId]);
        return result
    }
}
module.exports = new MomentService();