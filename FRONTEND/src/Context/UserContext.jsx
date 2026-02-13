import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext()

export const GetUser = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [isLogin, setIsLogin] = useState(false)

  const serverUrl = 'https://musichub-utha.onrender.com'
  // const serverUrl = 'http://localhost:3000'

  const getUser = async () => {
    try {
      const userResponse = await axios.get(`${serverUrl}/api/auth/getuser`, {
        withCredentials: true
      })
      // console.log(userResponse.data.user)
      setUser(userResponse.data.user)
      setIsLogin(true)
      setError(null)
    } catch (error) {
      const msg = error.response?.data?.message || 'Something went wrong'
      setUser(null)
      setError(msg)
      setIsLogin(false)
    }
  }
  useEffect(() => {
    getUser()
  }, [])
  return (
    <UserContext.Provider
      value={{ user, setUser, error, isLogin, setIsLogin, getUser, serverUrl }}
    >
      {children}
    </UserContext.Provider>
  )
}
