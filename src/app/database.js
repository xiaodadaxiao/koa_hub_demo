const mysql = require('mysql2')
//导入数据连接的地址端口账号密码
const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = require('./config')
const connections = mysql.createPool({
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE
})
connections.getConnection((err, conn) => {
    conn.connect((err) => {
        if (err) {
            console.log("数据连接失败", err)
        } else {
            console.log("数据库连接成功")
        }
    })
})

module.exports = connections.promise();