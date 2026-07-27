const express = require('express')
const router = express.Router()
const Controller = require('../controllers/user.controller')
const isAuth = require('../middleware/isAuth')

/**
 *  -POST /api/auth
 */
router.post('/register', Controller.userRegister)
router.post('/login', Controller.userLogin)
router.post('/logout', Controller.logout)

/**
 *  -POST /api/auth/getuser
 */
router.get('/getuser', isAuth, Controller.getUser)

module.exports = router
