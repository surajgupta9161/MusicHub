const ImageKit = require('@imagekit/nodejs')

const client = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
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
    console.error('ImageKit Error:', error)
    throw new Error('Video Uploading Error')
  }
}

module.exports = { uploadImage }
