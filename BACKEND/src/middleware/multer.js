const multer = require('multer')

const storage = multer.memoryStorage()

const upload = multer({
  storage,

  limits: {
    fileSize: 20 * 1024 * 1024 // 20MB max video size
  },

  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('video/')) {
      return cb(null, false) // reject file safely
    }
    cb(null, true)
  }
})

module.exports = upload
