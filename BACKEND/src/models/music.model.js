const mongoose = require('mongoose')

const musicSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    ownby: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

const Music = mongoose.model('Music', musicSchema)

module.exports = Music
