import React, { useContext } from 'react'
import AllPosts from '../src/Components/AllPosts'
import NavBar from '../src/Components/NavBar'
import { Route, Routes } from 'react-router-dom'
import Signup from '../src/Components/Signup'
import Login from '../src/Components/Login'
import CreateMusic from '../src/Components/Createmusic'
import { UserContext } from './Context/UserContext'

const App = () => {
  const { user, error, isLogin } = useContext(UserContext)
  console.log(user)

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<AllPosts />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/createmusic'
          element={user ? <CreateMusic /> : <Login />}
        />
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
