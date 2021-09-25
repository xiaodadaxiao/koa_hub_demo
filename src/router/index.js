//该函数将所有本文件夹的路由文件注册到app实例（动态）
const fs = require('fs')
const path = require('path')
const useRoutersToApp = (app) => {
    //读取当前路径目录
    fs.readdirSync(__dirname).forEach((fileName) => {
        //匹配以 .router.js结尾的文件名
        if (! /\.router\.js$/.test(fileName)) return;
        //导入路由文件
        const routerItem = require(path.join(__dirname, fileName))
        app.use(routerItem.routes())
        app.use(routerItem.allowedMethods())
    })
}
module.exports = useRoutersToApp