const express = require('express')
const router = express.Router()
const Controller = require('../controllers/user.controller')
const upload = require('../middleware/multer')
const musicController = require('../controllers/music.controller')
const isAuth = require('../middleware/isAuth')

router.post('/music', upload.single('image'), Controller.musicCreate)

router.get('/allMusic', Controller.musicGet)

/**
 * -PATCH /api/auth/editMusic/:id
 */
router.patch('/editMusic/:id', isAuth, musicController.updateMusic)

/**
 * -PATCH /api/auth/deleteMusic/:id
 */
router.delete('/deleteMusic/:id', isAuth, musicController.deleteMusic)

module.exports = router
