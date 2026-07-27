const express = require('express')
const router = express.Router()
// const Controller = require('../controllers/music.controller')
const upload = require('../middleware/multer')
const musicController = require('../controllers/music.controller')
const isAuth = require('../middleware/isAuth')

/**
 * -GET /api/auth/music
 */

router.post('/music', upload.single('image'), musicController.musicCreate)

/**
 * -GET /api/auth/allMusic
 */

router.get('/allMusic', musicController.musicGet)

/**
 * -PATCH /api/auth/editMusic/:id
 */
router.patch('/editMusic/:id', isAuth, musicController.updateMusic)

/**
 * -Delete /api/auth/deleteMusic/:id
 */
router.delete('/deleteMusic/:id', isAuth, musicController.deleteMusic)

module.exports = router
