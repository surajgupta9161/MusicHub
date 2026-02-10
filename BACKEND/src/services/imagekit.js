const ImageKit = require('@imagekit/nodejs')

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY // This is the default and can be omitted
})

const uploadImage = async buffer => {
  try {
    const response = await client.files.upload({
      file: buffer.toString('base64'), //required
      fileName: 'spotify', //required
      folder: 'music'
    })
    return response
  } catch (error) {
    return json({ message: 'Image Uploading Error ' })
  }
}

module.exports = { uploadImage }
