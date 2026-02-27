import axios from 'axios'
import React, { useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import LoginLoader from '../Loader/LogLoader'

const NavBar = () => {
  const navigate = useNavigate()
  const { user, setUser, isLogin, setIsLogin, serverUrl } =
    useContext(UserContext)
  const [isLogOut, setIsLogout] = useState(false)
  const logoutHandler = async () => {
    //logout logic here
    setIsLogout(true)
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      )
      if (response.status === 200) {
        setUser(null)
        setIsLogin(false)
        setIsLogout(false)
        alert(response.data.message)
        navigate('/login')
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Something went wrong'
      setUser(null)
      setIsLogin(false)
      setIsLogout(false)
      alert(msg)
    }
  }

  const artistHandler = () => {
    if (user.role !== 'artist') {
      alert('Only Artist can Create Music!')
      navigate('/')
    } else {
      navigate('/createmusic')
    }
  }

  return (
    <>
      <div className='bg-[#111827] p-3 sticky -top-0.5 z-10 flex items-center justify-around gap-2'>
        <h1 className='bg-blue-300 py-2 px-4 rounded-xl font-semibold'>
          MusicHub
        </h1>
        {!isLogin && (
          <button
            onClick={() => navigate('/signup')}
            className='bg-green-700 cursor-pointer active:scale-95 py-2 px-4 rounded-xl font-semibold'
          >
            {isLogOut && <LoginLoader value={'Logging Out...'} />}
            Signup
          </button>
        )}

        {isLogin ? (
          <button
            onClick={logoutHandler}
            className='bg-green-700 cursor-pointer active:scale-95 py-2 px-4 rounded-xl font-semibold'
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='bg-green-700 cursor-pointer active:scale-95 py-2 px-4 rounded-xl font-semibold'
          >
            Login
          </button>
        )}
        {isLogin && (
          <button
            onClick={artistHandler}
            className='bg-green-700 cursor-pointer active:scale-95 py-2 px-4 rounded-xl font-semibold'
          >
            Post
          </button>
        )}
        {isLogin && (
          <img
            onClick={() => navigate('/profile')}
            className='h-9 w-9 rounded-full object-cover border-2 border-white cursor-pointer'
            src='https://i.pinimg.com/736x/62/01/0d/62010d848b790a2336d1542fcda51789.jpg'
            alt='dp image'
          />
        )}
      </div>
    </>
  )
}

export default NavBar
