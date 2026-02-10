import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className='bg-amber-400  p-3 sticky top-0 z-10 flex items-center justify-center gap-2'>
        <h1 className='bg-blue-300 py-2 px-4 rounded-xl font-semibold'>
          MusicHub
        </h1>

        <button
          onClick={() => navigate('/signup')}
          className='bg-green-700 cursor-pointer active:scale-95 py-2 px-4 rounded-xl font-semibold'
        >
          Signup
        </button>
        <button
          onClick={() => navigate('/login')}
          className='bg-green-700 cursor-pointer active:scale-95 py-2 px-4 rounded-xl font-semibold'
        >
          Login
        </button>
        <button
          onClick={() => navigate('/createmusic')}
          className='bg-green-700 cursor-pointer active:scale-95 py-2 px-4 rounded-xl font-semibold'
        >
          Post
        </button>
      </div>
    </>
  )
}

export default NavBar
