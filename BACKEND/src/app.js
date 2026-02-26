const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const userRoute = require('./routes/user.route')
const cookieParser = require('cookie-parser')
const musicRoute = require('./routes/music.route')
const cors = require('cors')

const app = express()
app.set('trust proxy', 1)

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://musichub-2.onrender.com'
        : 'http://localhost:5173',
    credentials: true
  })
)

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ✅ API ROUTES ONLY
app.use('/api/auth', userRoute)
app.use('/api/auth', musicRoute)

module.exports = app
