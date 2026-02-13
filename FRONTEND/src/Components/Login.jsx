import axios from 'axios'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'

const Login = () => {
  const Navigate = useNavigate()
  const { getUser, setIsLogin, serverUrl } = useContext(UserContext)

  const loginHandler = async e => {
    e.preventDefault()

    const identifier = e.target[0].value // email OR username
    const password = e.target[1].value

    const data = {
      identifier, // email/username dono ke liye common field
      password
    }

    try {
      const resposne = await axios.post(`${serverUrl}/api/auth/login`, data, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })

      if (resposne.status === 200) {
        await getUser()
        alert(resposne.data.message)
        Navigate('/')
      }
    } catch (err) {
      console.log(err.response.data.message) // 👈 backend message
      alert(err.response.data.message)
    }
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

          <h2 className='text-xl font-bold mb-4 text-center'>Login</h2>

          <form onSubmit={loginHandler} className='flex flex-col gap-3'>
            <input
              type='text'
              placeholder='Email or Username'
              className='border p-2 rounded-lg'
              required
            />

            <input
              type='password'
              placeholder='Password'
              className='border p-2 rounded-lg'
              required
            />

            <button
              type='submit'
              className='bg-green-700 text-white py-2 cursor-pointer rounded-lg font-semibold active:scale-95'
            >
              Login
            </button>
            <p onClick={() => Navigate('/signup')}>
              Don't have account? Signup
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
