const express = require('express')
const router = express.Router()
const Controller = require('../controllers/user.controller')

router.post('/register', Controller.userRegister)
router.post('/login', Controller.userLogin)
router.post('/logout', Controller.logout)

module.exports = router
