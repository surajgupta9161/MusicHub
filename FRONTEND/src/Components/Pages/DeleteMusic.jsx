import axios from 'axios'
import { useContext } from 'react'
import { toast } from 'react-hot-toast'
import { UserContext } from '../../Context/UserContext'

const DeleteMusic = ({ musicId, onDelete }) => {
  //   const { serverUrl } = useContext(UserContext)
  const { serverUrl, posts, setPosts } = useContext(UserContext)

  const handleDelete = () => {
    let toastId

    toastId = toast.custom(
      () => (
        <div className='bg-zinc-900 border border-red-500 rounded-lg p-4 text-white w-80 shadow-lg'>
          <p className='mb-4 font-medium'>
            Are you sure you want to delete this music?
          </p>

          <div className='flex justify-end gap-2'>
            <button
              onClick={() => toast.dismiss(toastId)}
              className='px-3 py-1 cursor-pointer rounded bg-zinc-700 hover:bg-zinc-600'
            >
              Cancel
            </button>

            <button
              onClick={async () => {
                toast.dismiss(toastId)

                try {
                  const { data } = await axios.delete(
                    `${serverUrl}/api/auth/deleteMusic/${musicId}`,
                    {
                      withCredentials: true
                    }
                  )

                  setPosts(prev => prev.filter(post => post._id !== musicId))

                  toast.dismiss()

                  toast.success(data.message, {
                    id: 'delete-success',
                    duration: 8000
                  })
                  toast.dismiss()
                } catch (error) {
                  toast.error(error.response?.data?.message || 'Delete Failed')
                }
              }}
              className='px-3 py-1 cursor-pointer rounded bg-red-600 hover:bg-red-700'
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity
      }
    )
  }

  return (
    <button
      onClick={handleDelete}
      //   className='bg-red-500 ml-6 hover:bg-red-700 text-white px-1 py-1 cursor-pointer rounded-md transition'
      className='px-2 py-1 ml-8 text-sm rounded-md border border-zinc-600 bg-zinc-900 text-zinc-100 hover:bg-zinc-800 hover:border-zinc-400 transition-all duration-200 cursor-pointer'
    >
      Delete
    </button>
  )
}

export default DeleteMusic
