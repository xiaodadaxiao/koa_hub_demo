const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')
//1 、 将根目录的.env文件内容写入process.env
dotenv.config();

//2、 读取公钥和私钥
const PUBLIC_KEY = fs.readFileSync(path.join(__dirname, 'keys', 'public.key'), { encoding: 'utf-8' })
const PRIVATE_KEY = fs.readFileSync(path.join(__dirname, 'keys', 'private.key'), { encoding: 'utf-8' })

module.exports = {
    //启动端口
    APP_PORT: process.env.APP_PORT,
    APP_HOST: process.env.APP_HOST,
    //数据库
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_PORT: process.env.MYSQL_PORT,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    //公钥私钥
    PUBLIC_KEY,
    PRIVATE_KEY,
}