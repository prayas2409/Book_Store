const express = require('express');
const router = express.Router();
let controller = require('../controller/controller');

router.post('/addBook', controller.addBookController);
module.exports = router;