//图书模块
const express = require('express');
const router = express.Router();
const handle = require('../router_handle/books_handle');

//获取图书类别
router.get('/getBookType',handle.getBookType);

//添加图书
router.post('/addBook',handle.addBook);

//获取所有图书
router.get('/getBooks',handle.getBooks);

//根据图书名获取图书信息
router.post('/getBookByName',handle.getBookByName);

//获取所有图书名
router.get('/getBookName',handle.getBookName);

//根据图书id删除图书信息
router.post('/deleteBook',handle.deleteBook);

//根据图书名修改图书数量
router.post('/updateBookNum',handle.updateBookNum);

module.exports = router;
