import React, { useContext, useEffect } from 'react'
import AllPosts from '../src/Components/Pages/AllPosts'
import NavBar from './Components/Layout/NavBar'
import { Route, Routes } from 'react-router-dom'
import Signup from '../src/Components/Pages/Signup'
import Login from '../src/Components/Pages/Login'
import CreateMusic from '../src/Components/Pages/Createmusic'
import { UserContext } from './Context/UserContext'
import Profile from './Components/Pages/Profile'
import PageNotFound from './Components/PageNotFound/NotFound'

import { Toaster } from 'react-hot-toast'

const App = () => {
  const { user, error, isLogin } = useContext(UserContext)

  return (
    <div>
      <NavBar />
      {/* ✅ Global Toast System */}
      <Toaster
        position='top-right'
        containerStyle={{
          top: '70px'
        }}
        toastOptions={{
          style: {
            background: '#111827',
            color: '#e5e7eb',
            fontWeight: 600
          },
          success: {
            style: {
              color: '#22c55e'
            }
          },
          error: {
            style: {
              color: '#ef4444'
            }
          },
          loading: {
            style: {
              color: '#facc15'
            }
          }
        }}
        reverseOrder={false}
      />
      <Routes>
        <Route path='/' element={<AllPosts />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/createmusic'
          element={user ? <CreateMusic /> : <Login />}
        />
        <Route path='/profile' element={user ? <Profile /> : <Login />} />
        <Route
          path='*'
          element={
            <h1 className='text-center mt-10 text-3xl'>
              <PageNotFound />
            </h1>
          }
        />
      </Routes>
    </div>
  )
}

export default App
