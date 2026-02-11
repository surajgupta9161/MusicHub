const jwt = require('jsonwebtoken')
const isAuth = (req, res, next) => {
  const token = req.cookies.userToken
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Token Not Available Please Login or Signin' })
  }
  let decoded
  try {
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
      return res.status(403).json({ message: 'Invalid Token' })
    }
    req.user = decoded
    // console.log(decoded)
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}
module.exports = isAuth
