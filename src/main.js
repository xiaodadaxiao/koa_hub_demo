const app = require('./app')
const { APP_PORT } = require('./app/config')
//加载文件，连接数据库
require('./app/database')
app.listen(APP_PORT, () => {
    console.log(`服务器启动成功，监听${APP_PORT}端口`);
})

require('./app/database')
