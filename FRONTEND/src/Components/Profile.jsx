import React, { useContext } from 'react'
import './Profile.css'
import { UserContext } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import MyMusic from '../Components/MyMusic'
import Login from '../Components/Login'

const Profile = () => {
  const { user, userMusic } = useContext(UserContext)
  const Navigate = useNavigate()

  return (
    <div className='container-box mb-5'>
      <div className='ml-5 mr-5 text-white '>
        <p
          className='text-2xl mb-2 mt-2 cursor-pointer'
          onClick={() => Navigate('/')}
        >
          <IoMdArrowRoundBack />
        </p>

        <div className='flex gap-8'>
          <img
            className='h-15 w-15 rounded-full object-cover border-2 border-white'
            src='https://i.pinimg.com/736x/62/01/0d/62010d848b790a2336d1542fcda51789.jpg'
            alt='dp image'
          />
          <div>
            <h2 className='flex text-xl '> {user?.username}</h2>
            <h2 className='text-xl'> {userMusic?.length}</h2>
            <p className='font-semibold'>Posts</p>
          </div>
        </div>
        {user ? <MyMusic /> : <Login />}
      </div>
    </div>
  )
}

export default Profile
