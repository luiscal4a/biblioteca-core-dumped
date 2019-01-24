'use strict'

const express = require('express')
const userRouter = express.Router()

const userController = require('../controllers/userController')

router.post('/createUser', userController.createUser)
router.get('/getUser', userController.getUser)
router.get('/getUserList', userController.getUserList)
