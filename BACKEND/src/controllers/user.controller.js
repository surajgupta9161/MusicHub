const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Music = require('../models/music.model')
const { uploadImage } = require('../services/imagekit')

const userRegister = async (req, res) => {
  const { username, email, password, role = 'user' } = req.body
  const existUser = await User.findOne({
    $or: [{ username }, { email }]
  })
  if (existUser) {
    return res.status(400).json({ message: 'Username or email already exists' })
  }

  try {
    const hash = await bcrypt.hash(password, 10)
    const user = await User.create({
      username,
      email,
      password: hash,
      role
    })
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET
    )
    res.cookie('userToken', token)
    // console.log(user)
    res.status(201).json({ message: 'User Created Successfully', user })
  } catch (error) {
    return res.status(500).json({ message: 'User Creating Error' })
  }
}

const userLogin = async (req, res) => {
  const { email, username, password } = req.body
  try {
    const user = await User.findOne({
      $or: [{ email }, { username }]
    })
    if (!user) {
      return res.status(400).json({ message: 'User not Found!' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect Password!' })
    }
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET
    )
    res.cookie('userToken', token)
    res.status(200).json({ message: 'User Login Successfully', user })
  } catch (error) {
    return res.status(500).json({ message: 'User Login Error' })
  }
}

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
      return res.status(403).json({ message: 'Invalid Token' })
    }

    //Creating Music Logic Here
    const { title } = req.body
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'file is required' })
      }
      const response = await uploadImage(req.file.buffer)
      console.log(response.url)
      if (!title) {
        return res.status(400).json({ message: 'Title are required' })
      }
      try {
        const music = await Music.create({
          title,
          artist: decoded.id,
          image: response.url
        })
        console.log(music)
      } catch (error) {
        return res.status(500).json({ message: 'Music Uploading Error' })
      }
    } catch (error) {
      return res.status(500).json({ message: 'Image Uploading Error' })
    }

    res
      .status(201)
      .json({ message: 'Music Created Successfully', role: decoded.role })
  } catch (error) {
    return res.status(500).json({ message: 'Music Creating Error' })
  }
}

const musicGet = async (req, res) => {
  try {
    const musics = await Music.find()
    res.status(200).json({ message: 'Music Fetch Successfully', musics })
  } catch (error) {
    return res.status(500).json({ message: 'Music Fetching Error' })
  }
}

const logout = (req, res) => {
  res.clearCookie('userToken')
  res.status(200).json({ message: 'User Logout Successfully' })
}

module.exports = {
  userRegister,
  userLogin,
  musicCreate,
  musicGet,
  logout
}
