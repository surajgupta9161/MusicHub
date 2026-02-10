import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Signup = () => {
  const Navigate = useNavigate()
  const signupHandler = async e => {
    e.preventDefault()
    //signup logic here
    const formData = new FormData(e.target)

    const data = Object.fromEntries(formData.entries())
    console.log(data)
    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/register',
        data,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
      console.log(response)
      if (response.status === 201) {
        alert(response?.data?.message)
        Navigate('/login')
      }
    } catch (error) {
      console.log(error?.response?.data?.message) // 👈 backend message
      alert(error?.response?.data?.message)
    }
  }
  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-white w-[90%] max-w-md p-6 rounded-xl relative'>
        <button
          onClick={() => Navigate('/')}
          className='absolute top-2 right-3 text-xl cursor-pointer font-bold'
        >
          ✕
        </button>

        <h2 className='text-xl font-bold mb-4 text-center'>Create Account</h2>

        <form onSubmit={signupHandler} className='flex flex-col gap-3'>
          <input
            type='text'
            name='username'
            placeholder='Username'
            className='border p-2 rounded-lg'
            required
          />

          <input
            type='email'
            name='email'
            placeholder='Email'
            className='border p-2 rounded-lg'
            required
          />

          <input
            type='password'
            name='password'
            placeholder='Password'
            className='border p-2 rounded-lg'
            required
          />

          <select name='role' className='border p-2 rounded-lg'>
            <option value='user'>User</option>
            <option value='artist'>Artist</option>
          </select>

          <button
            type='submit'
            className='bg-green-700 text-white py-2 cursor-pointer rounded-lg font-semibold active:scale-95'
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup
