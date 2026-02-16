import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const { user } = useContext(UserContext)
  const Navigate = useNavigate()

  return (
    <div className='m-5 text-white'>
      <div className='flex gap-10'>
        <img
          className='h-15 w-15 rounded-full object-cover border-2 border-white'
          src='https://i.pinimg.com/736x/62/01/0d/62010d848b790a2336d1542fcda51789.jpg'
          alt='dp image'
        />
        <h2 className='flex justify-center items-center text-2xl '>
          {' '}
          {user?.username}
        </h2>
        {user?.artist}
      </div>
      <h3 className='mt-10 text-2xl flex justify-center items-center'>
        Comming soon!
      </h3>
    </div>
  )
}

export default Profile
