//获取token中的用户名
const express = require('express');
//创建路由实例对象
const router = express.Router();
//导入处理函数
const handle = require('../router_handle/getUserInfo');

//获取token中信息api
router.get('/getUserInfo',handle.getUserInfo);

//禁用用户
router.post('/stopUse',handle.stopUse);

//删除用户
router.post('/deleteUser',handle.deleteUser);

//更改用户权限
router.post('/updateRoot',handle.updateRoot);

//获取所有用户信息
router.get('/getAllUser',handle.getAllUser);

//导出router
module.exports = router;