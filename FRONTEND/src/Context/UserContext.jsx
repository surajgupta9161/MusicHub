import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

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

  const serverUrl =
    import.meta.env.MODE === 'production'
      ? 'https://musichub-utha.onrender.com'
      : 'http://localhost:3000'

  const getUser = async () => {
    try {
      const userResponse = await axios.get(`${serverUrl}/api/auth/getuser`, {
        withCredentials: true
      })
      // console.log(userResponse.data.user)
      setUser(userResponse.data.user)
      toast('Welcome to Music World 🎵', {
        duration: 4000,
        icon: '👋'
      })
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
    const loadingToast = toast.loading('Loading music & videos... 🎵')
    try {
      const res = await axios.get(`${serverUrl}/api/auth/allMusic`, {
        timeout: 55000
      })
      setPosts(res.data.musics)
      toast.dismiss(loadingToast)
      // ✅ Data aa gaya → toast
      setTimeout(() => {
        toast('Some videos may load slowly due to bandwidth issues 📡', {
          duration: 4000,
          icon: '🎧',
          style: {
            background: '#020617',
            color: '#38fdf8',
            border: '1px solid #38fdf8',
            fontWeight: '600'
          }
        })
      }, 3000)

      setPostsLoaded(true)
      setIsLoading(false)
    } catch (err) {
      setIsLoading(true)
      setPostsLoaded(true)
      console.log(err)
      toast.dismiss(loadingToast)
      let msg = 'Unable to load videos'
      // 🌐 network error
      if (!err.response) {
        msg = 'Network is slow or disconnected 🌐'
      }
      // ⏱ timeout error
      else if (err.code === 'ECONNABORTED') {
        msg = 'Connection timeout. Network is too slow ⏳'
      }
      // 🎥 backend / video error
      else if (err.response) {
        msg = err.response.data?.message || 'Video fetch failed 🎥'
      }

      toast.error(msg, {
        duration: 5000,
        icon: '🚫',
        style: {
          background: '#020617',
          color: '#ff6b6b',
          border: '1px solid #ff6b6b',
          fontWeight: '600'
        }
      })
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
