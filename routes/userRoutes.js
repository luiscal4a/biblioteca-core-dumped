'use strict'

const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

router.post('/createUser', userController.createUser);
router.post('/logUser', userController.logUser);
router.get('/getUser/:userId', userController.getUser);
router.get('/getUserList', userController.getUserList);
router.put('/updateUser', userController.updateUser);
router.delete('/deleteUser/:userId', userController.deleteUser);


module.exports = router;