const dotenv = require('dotenv')
//将根目录的.env文件内容写入process.env
dotenv.config();
module.exports = {
    //启动端口
    APP_PORT: process.env.APP_PORT,
    //数据库
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_PORT: process.env.MYSQL_PORT,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE
}