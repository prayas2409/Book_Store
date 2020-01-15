const express = require('express');
const router = express.Router();
let controller = require('../controller/controller');

router.post('/addBook', controller.addBookController);
router.get('/books', controller.getAllBooksController);
router.get('/sortBooks', controller.sortAllBooksController);
router.get('/searchBook', controller.searchBookController);

module.exports = router;