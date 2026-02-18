const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const userRoute = require('./routes/user.route')
const cookieParser = require('cookie-parser')
const musciRoute = require('./routes/music.route')
const cors = require('cors')
const path = require('path')

const app = express()
app.set('trust proxy', 1)
app.use(
  cors({
    // origin: 'http://localhost:5173',
    origin: 'https://musichub-2.onrender.com',
    credentials: true
  })
)

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', userRoute)
app.use('/api/auth', musciRoute)

// React frontend serve
// =======================
const frontendPath = path.join(__dirname, '../dist')
app.use(express.static(frontendPath))

// SPA fallback (VERY IMPORTANT)
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'))
})

module.exports = app
