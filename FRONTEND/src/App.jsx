import React from 'react'
import AllPosts from './assets/Components/AllPosts'
import NavBar from './assets/Components/NavBar'
import { Route, Routes } from 'react-router-dom'
import Signup from './assets/Components/Signup'
import Login from './assets/Components/Login'
import CreateMusic from './assets/Components/Createmusic'

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<AllPosts />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/createmusic' element={<CreateMusic />} />
        <Route
          path='*'
          element={
            <h1 className='text-center mt-10 text-3xl'>404 Not Found</h1>
          }
        />
      </Routes>
    </div>
  )
}

export default App
