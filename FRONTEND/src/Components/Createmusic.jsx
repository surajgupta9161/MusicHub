import { useNavigate } from 'react-router-dom'
const Createmusic = () => {
  const Navigate = useNavigate()

  const createPostHandler = async e => {
    e.preventDefault()
    //create post logic here
    try {
      const formData = new FormData()
      const fileInput = e.target.elements.image.files[0] // file select
      if (!fileInput) return alert('Please select a file')
      formData.append('file', fileInput) // key = 'file', value = File object

      console.log(fileInput)
    } catch (error) {}
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
            <label className='font-semibold' id='image'>
              Select File
            </label>
            <input
              type='file'
              accept='image/*,video/*'
              name='image'
              className='border p-2 rounded-lg'
              required
            />
            <label className='font-semibold' id='title'>
              Title
            </label>
            <input
              type='text'
              name='title'
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
