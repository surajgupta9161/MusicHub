import axios from 'axios'
import React, { useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'

const NavBar = () => {
  const navigate = useNavigate()

  const { user, setUser, isLogin, setIsLogin, serverUrl } =
    useContext(UserContext)

  const logoutHandler = async () => {
    //logout logic here
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      )
      if (response.status === 200) {
        setUser(null)
        setIsLogin(false)
        alert(response.data.message)
        navigate('/login')
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Something went wrong'
      setUser(null)
      setIsLogin(false)
      alert(msg)
    }
  }

  const artistHandler = () => {
    if (user.role === 'user') {
      alert('Only Artist can Create Music!')
      navigate('/')
    } else {
      navigate('/createmusic')
    }
  }

  return (
    <>
      <div className='bg-amber-400  p-3 sticky top-0 z-10 flex items-center justify-around gap-2'>
        <h1 className='bg-blue-300 py-2 px-4 rounded-xl font-semibold'>
          MusicHub
        </h1>
        {!isLogin && (
          <button
            onClick={() => navigate('/signup')}
            className='bg-green-700 cursor-pointer active:scale-95 py-2 px-4 rounded-xl font-semibold'
          >
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
      </div>
    </>
  )
}

export default NavBar
