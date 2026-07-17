const musicModel = require('../models/music.model')

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

    res.status(200).json({ message: 'Music Fetch Successfully', musics })
  } catch (error) {
    return res.status(500).json({ message: 'Music Fetching Error' })
  }
}

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

module.exports = { updateMusic, deleteMusic }
