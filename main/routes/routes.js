const express = require('express');
const router = express.Router();
let bookController = require('../controller/bookController');
let userController = require('../controller/userController');
let orderController = require('../controller/orderController');
let userLoginController = require('../controller/userLoginController');

router.post('/addBook', bookController.addBookController);
router.get('/books', bookController.getAllBooksController);
router.get('/sortBooks', bookController.sortAllBooksController);
router.get('/searchBook', bookController.searchBookController);
router.post('/addUser', userController.addUserController);
router.post('/orderBook', orderController.addOrderController);
router.get('/userLogin', userLoginController.loginUserController);

module.exports = router;