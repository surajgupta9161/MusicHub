import { useNavigate } from 'react-router-dom'
const Createmusic = () => {
  const Navigate = useNavigate()
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

          <form className='flex flex-col gap-3'>
            <label className='font-semibold' id='image'>
              Select File
            </label>
            <input
              type='file'
              accept='image/*'
              className='border p-2 rounded-lg'
              required
            />
            <label className='font-semibold' id='title'>
              Title
            </label>
            <input
              type='text'
              placeholder='Title'
              className='border p-2 rounded-lg'
            />

            <button
              type='submit'
              className='bg-green-700 text-white py-2 rounded-lg font-semibold active:scale-95 cursor-pointer'
            >
              Create Post
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Createmusic
