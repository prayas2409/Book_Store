const express = require('express');
const router = express.Router();
let controller = require('../controller/controller');

router.post('/addBook', controller.addBookController);
router.get('/books', controller.getAllBooksController);
router.get('/books/sort', controller.sortAllBooksController);

module.exports = router;