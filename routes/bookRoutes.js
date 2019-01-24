'use strict'

const express = require('express')
const bookRouter = express.Router()

const bookController = require('../controllers/bookController')

router.post('/createBook', bookController.createBook);
router.get('/getAllBooks', bookController.getAllBooks);
router.get('/getBookByTitle/:title', bookController.getBookByTitle);
router.get('/getBooksByCategory/:category', bookController.getBooksByCategory);
router.get('/getBookByTag/:tag', bookController.getBookByTag);
router.put('/:bookId', bookController.updateBook);
router.delete('/:bookId', bookController.deleteBook);

module.exports = bookRouter