'use strict'

const express = require('express')
const router = express.Router()

const bookController = require('../controllers/bookController')

router.post('/createBook', bookController.createBook);
router.get('/getBooks/:bookId', bookController.getAllBooks);
router.get('/getEpubData', bookController.parseEpub);
router.get('/getPDFData', bookController.parsePDF);
router.get('/getAllBooks', bookController.getAllBooks);
router.get('/getBooksByTitle/:title', bookController.getBookByTitle);
router.get('/getBooksByCategory/:category', bookController.getBookByCategory);
router.get('/getBooksByTag/:tag', bookController.getBookByTag);
router.put('/:bookId', bookController.updateBook);
router.delete('/:bookId', bookController.deleteBook);

module.exports = router