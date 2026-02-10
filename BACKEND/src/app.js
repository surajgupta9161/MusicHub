const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const userRoute = require('./routes/user.route')
const cookieParser = require('cookie-parser')
const musciRoute = require('./routes/music.route')
const cors = require('cors')

const app = express()
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', userRoute)
app.use('/api/auth', musciRoute)

module.exports = app
