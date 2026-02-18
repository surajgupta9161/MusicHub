import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext()

export const GetUser = ({ children }) => {
  //User states
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [isLogin, setIsLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  //Posts states
  const [posts, setPosts] = useState([])
  const [postsLoaded, setPostsLoaded] = useState(false)

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

  const getAllPosts = async () => {
    if (postsLoaded) return // 🔥 already fetched → skip
    try {
      const res = await axios.get(`${serverUrl}/api/auth/allMusic`)
      setPosts(res.data.musics)
      setPostsLoaded(true)
      setIsLoading(false)
    } catch (err) {
      setIsLoading(true)
      setPostsLoaded(true)
      console.log(err)
    }
  }

  useEffect(() => {
    getUser()
    if (!postsLoaded) {
      getAllPosts()
    }
  }, [])

  let userMusic
  if (posts?.length && user?._id) {
    userMusic = posts.filter(post => post?.artist?._id === user._id)
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        error,
        isLogin,
        setIsLogin,
        getUser,
        serverUrl,
        posts,
        postsLoaded,
        isLoading,
        userMusic
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
