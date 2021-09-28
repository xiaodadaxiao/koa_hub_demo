/* 评论相关数据库操作 */
const connection = require('../app/database')
class CommentService {
    //发表评论
    async create(content, userId, momentId) {
        const statement = `INSERT INTO COMMENT (content,user_id,moment_id) VALUES (?,?,?);`
        const result = await connection.execute(statement, [content, userId, momentId]);
        return result[0];
    }
    //回复评论
    async reply(content, userId, momentId, commentId) {
        const statement = `INSERT INTO COMMENT (content,user_id,moment_id,comment_id) VALUES (?,?,?,?);`
        const result = await connection.execute(statement, [content, userId, momentId, commentId]);
        return result[0];
    }
    //修改评论
    async update(content, commentId) {
        const statement = `UPDATE	COMMENT SET content =? WHERE id =?`
        const result = await connection.execute(statement, [content, commentId])
        return result[0]
    }
    //删除评论
    async remove(commentId) {
        const statement = `DELETE FROM comment WHERE id=?`
        const result = await connection.execute(statement, [commentId]);
        return result[0]
    }
    //获得动态的评论列表
    async getCommentByMomentId(momentId, offset, size) {
        const statement = `
        SELECT c.id id,c.content content ,c.moment_id momentId,c.createAt createTime,c.updateAt updateTime,
        JSON_OBJECT('id',u.id,'name',u.name) user
        FROM COMMENT  c
        LEFT JOIN  users u ON u.id=c.user_id
        WHERE moment_id=? 
        LIMIT ?,?
        `
        const countSql = `SELECT count(*) commentCount FROM COMMENT WHERE moment_id=? `
        const result = await connection.execute(statement, [momentId, offset, size]);
        const [[count]] = await connection.execute(countSql, [momentId]);
        //console.log(count.commentCount);
        return { list: result[0], count: count.commentCount }
    }
}
module.exports = new CommentService()