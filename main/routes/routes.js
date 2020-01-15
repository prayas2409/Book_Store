var express = require('express');
var router = express.Router();
let controller = require('../controller/controller')

/* GET home page. */
router.get('/books', controller.getAllBooksController);
module.exports = router;