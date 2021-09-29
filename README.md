## 项目

基于 koa 和 mysql 的 nodejs 项目

### 注意

#### 配置信息

根目录需要配置 ".env"文件,配置相关信息

比如：

```env
APP_PORT= 3000
APP_HOST=你的服务器启动地址，比如  http://localhost

MYSQL_HOST=mysql地址，比如：  localhost
MYSQL_PORT= 3306
MYSQL_USER=mysql用户名
MYSQL_PASSWORD=mysql密码
MYSQL_DATABASE= 数据库名
```

比如：

```env
APP_PORT= 3000
APP_HOST=http://localhost

MYSQL_HOST= localhost
MYSQL_PORT= 3306
MYSQL_USER=xxxx
MYSQL_PASSWORD=xxxx
MYSQL_DATABASE= coderhub
```

#### 公钥和私钥

在 ./app/keys 文件夹下，需要补充和私钥文件夹 "private.key"
并且更改公钥文件（与私钥匹配）
