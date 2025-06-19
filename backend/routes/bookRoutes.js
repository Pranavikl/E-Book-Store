const express = require('express');
const router = express.Router();
const { getAllBooks, addBook } = require('../controllers/bookController');

router.get('/', getAllBooks);
router.post('/add', addBook);

module.exports = router;
