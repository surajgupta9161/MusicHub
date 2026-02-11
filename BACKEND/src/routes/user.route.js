const express = require('express')
const router = express.Router()
const Controller = require('../controllers/user.controller')
const isAuth = require('../middleware/isAuth')

router.post('/register', Controller.userRegister)
router.post('/login', Controller.userLogin)
router.post('/logout', Controller.logout)
router.get('/getuser', isAuth, Controller.getUser)

module.exports = router
