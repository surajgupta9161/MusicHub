const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Music = require('../models/music.model')

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
    res.cookie('userToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    // console.log(user)
    res.status(201).json({ message: 'User Created Successfully', user })
  } catch (error) {
    return res.status(500).json({ message: 'User Creating Error' })
  }
}
/**
 * -User Login /api/auth/login
 */
const userLogin = async (req, res) => {
  const { identifier, password } = req.body
  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }]
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

    res.cookie('userToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // cross-site cookie allow
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    res.status(200).json({ message: 'User Login Successfully', user })
  } catch (error) {
    return res.status(500).json({ message: 'User Login Error' })
  }
}

const logout = (req, res) => {
  res.clearCookie('userToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/'
  })
  res.status(200).json({ message: 'User Logout Successfully' })
}

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'User Not Found' })
    }
    return res.status(200).json({ message: 'User Fetch Successfully', user })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'User Fetching Error', error: error.message })
  }
}

module.exports = {
  userRegister,
  userLogin,
  logout,
  getUser
}
