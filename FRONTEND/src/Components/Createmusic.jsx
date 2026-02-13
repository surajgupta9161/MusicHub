import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { UserContext } from '../Context/UserContext'
import { useContext } from 'react'

const Createmusic = () => {
  const Navigate = useNavigate()
  const [isUploading, setIsUploading] = useState(false)
  const { serverUrl } = useContext(UserContext)

  const MAX_SIZE = 20 * 1024 * 1024 // 20MB

  const createPostHandler = async e => {
    e.preventDefault()
    setIsUploading(true)
    try {
      const formData = new FormData()
      const fileInput = e.target.elements.image.files[0]
      const title = e.target.elements.title.value

      if (!fileInput) {
        setIsUploading(false)
        return alert('Please select a video file')
      }

      if (!fileInput.type.startsWith('video/')) {
        setIsUploading(false)
        return alert(' Only video files are allowed')
      }

      if (fileInput.size > MAX_SIZE) {
        setIsUploading(false)
        return alert(' Video size must be less than 20MB')
      }

      formData.append('image', fileInput) // backend expects 'image'
      formData.append('title', title)

      await axios.post(`${serverUrl}/api/auth/music`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      alert('✅ Video uploaded successfully')
      setIsUploading(false)
      Navigate('/')
    } catch (error) {
      setIsUploading(false)
      alert(error?.response?.data?.message || 'Upload failed')
    }
  }

  return (
    <div>
      <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
        <div className='bg-white w-[90%] max-w-md p-6 rounded-xl relative'>
          <button
            onClick={() => Navigate('/')}
            className='absolute top-2 right-3 text-xl font-bold cursor-pointer'
          >
            ✕
          </button>

          <h2 className='text-xl font-bold mb-4 text-center'>Create Post</h2>

          <form onSubmit={createPostHandler} className='flex flex-col gap-3'>
            <label className='font-semibold'>Select Video</label>
            <input
              type='file'
              accept='video/*'
              name='image'
              className='border p-2 rounded-lg'
              required
            />

            <label className='font-semibold'>Title</label>
            <input
              type='text'
              name='title'
              placeholder='Title'
              className='border p-2 rounded-lg'
              required
            />

            <button
              disabled={isUploading}
              type='submit'
              className='bg-green-700 text-white py-2 rounded-lg font-semibold active:scale-95 cursor-pointer'
            >
              Create Post
            </button>
          </form>
          <p className='text-green-800 mt-2 flex justify-center items-center font-semibold '>
            {isUploading ? 'Uploading...' : ''}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Createmusic
