import notFoundGif from '../../Assets/Gifs/pageNotFound.gif'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col items-center justify-center  '>
      <img
        className='w-full max-w-200 rounded-2xl '
        src={notFoundGif}
        alt='Page Not Found'
      />
      <button
        onClick={() => navigate('/')}
        className='bg-green-600 text-xl py-2 px-2 mt-5  cursor-pointer rounded-2xl'
      >
        Go Home
      </button>
    </div>
  )
}

export default PageNotFound
