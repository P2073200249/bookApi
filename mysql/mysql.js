//mysql配置文件
//导入mysql模块
const mysql = require("mysql");
//创建数据库本地连接  初始化配置
const db = mysql.createPool({
    host: "127.0.0.1",  //mysql本地ip
    user: "root",   //数据库管理员账号
    password: "admin123",//管理员账号密码
    database: "userInfo"//需要操作的数据库名称
})
//导出db
module.exports = db;