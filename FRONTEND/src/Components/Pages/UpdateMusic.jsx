import axios from 'axios'
import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { UserContext } from '../../Context/UserContext'

const UpdateMusic = ({ music, onClose }) => {
  // const { serverUrl, getAllPosts } = useContext(UserContext)
  const { serverUrl, setPosts } = useContext(UserContext)

  const [title, setTitle] = useState(music.title)

  const updateHandler = async e => {
    e.preventDefault()

    const toastId = toast.loading('Updating...')

    try {
      const res = await axios.patch(
        `${serverUrl}/api/auth/editMusic/${music._id}`,
        { title },
        { withCredentials: true }
      )

      setPosts(prev =>
        prev.map(post => (post._id === music._id ? { ...post, title } : post))
      )

      toast.success(res.data.message, { id: toastId })
      // await getAllPosts()
      onClose()
    } catch (err) {
      console.log(err.message)
      toast.error(err.response?.data?.message || 'Update failed 🙁', {
        id: toastId
      })
    }
  }

  return (
    <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded-lg w-100'>
        <h2 className='text-xl font-bold mb-4'>Edit Music</h2>

        <form
          onSubmit={updateHandler}
          className='flex flex-col gap-4 text-black'
        >
          <input
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
            className='border p-2 rounded'
          />

          <button className='bg-green-600 text-white py-2 rounded'>
            Update
          </button>

          <button
            type='button'
            onClick={onClose}
            className='bg-red-600 text-white py-2 rounded'
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateMusic
