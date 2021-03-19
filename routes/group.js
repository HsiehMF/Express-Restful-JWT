const express = require('express')
const router = express.Router()
const jwtAuth = require('../middleware/jwt-auth')
const groupController = require('../controller/group')

router.get('/', groupController.getAllGroup)
router.post('/', jwtAuth, groupController.createGroup)
router.get('/:groupId', jwtAuth, groupController.getGroupById)
router.delete('/:groupId', jwtAuth, groupController.deleteGroupById)

module.exports = router
