const express = require('express')
const router = express.Router()
const userController = require('../controller/user')

router.post('/signup', userController.userRegister)
router.delete('/:userId', userController.userDelete)
router.post('/login', userController.userLogin)

module.exports = router