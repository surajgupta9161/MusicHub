const musicModel = require('../models/music.model')
const { uploadImage } = require('../services/imagekit')
const jwt = require('jsonwebtoken')

/**
 * Music Create Controller
 */
const musicCreate = async (req, res) => {
  try {
    const token = req.cookies.userToken
    if (!token) {
      return res.status(403).json({ message: 'Please Login or Create Account' })
    }
    let decoded
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET)
      if (decoded.role !== 'artist') {
        return res.status(403).json({ message: 'Only Artist can Create Music' })
      }
    } catch (error) {
      console.log(error.message)
      return res
        .status(403)
        .json({ message: 'Invalid Token', error: error.message })
    }

    //Creating Music Logic Here
    const { title } = req.body
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Video file is required' })
      }
      console.log(req.file)
      console.log(req.file?.buffer?.length)
      const response = await uploadImage(req.file.buffer)
      console.log('Buffer from imagekit res ', response)
      if (!title) {
        return res.status(400).json({ message: 'Title are required' })
      }
      try {
        const music = await musicModel.create({
          title,
          artist: decoded.id,
          image: response.url
        })

        const newMusic = await musicModel
          .findById(music._id)
          .populate('artist', 'username')

        return res.status(201).json({
          message: 'Music Uploaded Successfully',
          music: newMusic
        })
      } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Music Uploading error ' })
      }
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .json({ message: 'Video Uploading Error', error: error })
    }

    res
      .status(201)
      .json({ message: 'Music Created Successfully', role: decoded.role })
  } catch (error) {
    console.log(error.message)
    return res
      .status(500)
      .json({ message: 'Music Creating Error', error: error.message })
  }
}

/**
 * GetAll Music Controller
 */
const musicGet = async (req, res) => {
  try {
    const musics = await musicModel.find().populate('artist', 'username')
    // console.log(musics)
    res.status(200).json({ message: 'Music Fetch Successfully', musics })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Music Fetching Error', error: error.message })
  }
}

/**
 * Update Music Controller
 */
const updateMusic = async (req, res) => {
  const { id } = req.params
  try {
    const musics = await musicModel
      .find({ _id: id })
      .populate('artist', 'username')
    // console.log(musics)
    const musicUser = musics[0].artist._id

    if (!musicUser.equals(req.user.id)) {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    const { title } = req.body
    if (title) {
      musics[0].title = title
    }
    await musics[0].save()

    res.status(200).json({ message: 'Title update Successfully', musics })
  } catch (error) {
    return res.status(500).json({ message: 'Music Fetching Error' })
  }
}

/**
 * Delete Music Controller
 */
const deleteMusic = async (req, res) => {
  const { id } = req.params
  try {
    const musics = await musicModel
      .find({ _id: id })
      .populate('artist', 'username')
    // console.log(musics)
    const musicUser = musics[0].artist._id

    // console.log(musicUser)
    // console.log(req.user.id)

    if (!musicUser.equals(req.user.id)) {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    await musicModel.findByIdAndDelete(id)

    res.status(200).json({ message: 'Music Deleted Successfully', musics })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Music Fetching Error', error: error.message })
  }
}

module.exports = { updateMusic, deleteMusic, musicCreate, musicGet }
