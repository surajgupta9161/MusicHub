const express = require('express')
const router = express.Router()
const Controller = require('../controllers/user.controller')
const upload = require('../middleware/multer')

router.post('/music', upload.single('image'), Controller.musicCreate)

router.get('/allMusic', Controller.musicGet)

module.exports = router
