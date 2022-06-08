//图书借阅
const express = require('express');
const router = express.Router();
const handle = require('../router_handle/borrowBook_handle')

//图书借阅
router.post('/borrowBook',handle.borrowBook);

//查看所有借阅记录
router.get('/getBorrowHistory',handle.getBorrowHistory);

//根据书名删除借阅记录
router.post('/deleteHistoryById',handle.deleteHistoryById);

//根据书名查询借阅记录
router.post('/getHistoryByName',handle.getHistoryByName);

module.exports = router;