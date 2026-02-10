import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const Navigate = useNavigate()
  const loginHandler = async e => {
    e.preventDefault()
    //login logic here
    const data = {
      email: e.target[0].value,
      password: e.target[1].value
    }
    console.log(data)
    try {
      const resposne = await axios.post(
        'http://localhost:3000/api/auth/login',
        data,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
      console.log(resposne)
      if (resposne.status === 200) {
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
              type='email'
              placeholder='Email'
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
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
