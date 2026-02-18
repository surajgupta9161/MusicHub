import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../Context/UserContext'

const Signup = () => {
  const Navigate = useNavigate()
  const { setIsLogin, setUser, serverUrl } = useContext(UserContext)
  const [isSignup, setIsSignup] = useState(false)

  const signupHandler = async e => {
    e.preventDefault()
    //signup logic here
    setIsSignup(true)
    const formData = new FormData(e.target)

    const data = Object.fromEntries(formData.entries())
    // console.log(data)
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/register`,
        data,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
      // console.log(response)
      if (response.status === 201) {
        setIsSignup(false)
        alert(response?.data?.message)
        setUser(response.data)
        setIsLogin(true)
        Navigate('/')
      }
    } catch (error) {
      setIsSignup(false)
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
            disabled={isSignup}
            type='submit'
            className='bg-green-700 text-white py-2 cursor-pointer rounded-lg font-semibold active:scale-95'
          >
            Signup
          </button>
          <p className='text-green-800 mt-2 flex justify-center items-center font-semibold '>
            {isSignup && 'Please wait...'}
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup
