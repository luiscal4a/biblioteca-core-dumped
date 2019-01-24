'use strict'

const express = require('express')
const bookRouter = express.Router()

const bookController = require('../controllers/bookController')

router.post('/createBook', bookController.createBook)
router.get('/getAllBooks', bookController.getAllBooks)
router.get('/getBookByName', bookController.getBookByName)
router.get('/getBooksByCategory', bookController.getBooksByCategory)
router.get('/getBookByTag', bookController.getBookByTag)

module.exports = bookRouter