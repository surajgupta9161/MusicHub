const express = require('express')
const router = express.Router()
const Controller = require('../controllers/user.controller')
const multer = require('multer')
const file = multer({ storage: multer.memoryStorage() })

router.post('/music', file.single('image'), Controller.musicCreate)

router.get('/allMusic', Controller.musicGet)

module.exports = router
