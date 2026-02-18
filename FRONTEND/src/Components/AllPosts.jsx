import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { UserContext } from '../Context/UserContext'

const AllPosts = () => {
  // const [posts, setPosts] = useState([])
  const videoRefs = useRef({})
  const [currentPlaying, setCurrentPlaying] = useState(null)
  const { isLoading, posts } = useContext(UserContext)

  // useEffect(() => {
  //   axios
  //     .get(`${serverUrl}/api/auth/allMusic`)
  //     .then(res => {
  //       setPosts(res.data.musics)
  //       setIsLoading(false)
  //     })
  //     .catch(err => {
  //       setIsLoading(false)
  //       return err.response
  //         ? alert(err.response.data.message)
  //         : alert('Error fetching music')
  //     })
  // }, [])

  const togglePlay = id => {
    const video = videoRefs.current[id]
    if (!video) return

    // agar koi aur video chal raha hai → stop
    if (currentPlaying && currentPlaying !== id) {
      const prevVideo = videoRefs.current[currentPlaying]
      if (prevVideo) {
        prevVideo.pause()
        prevVideo.currentTime = 0
      }
    }

    // toggle logic
    if (video.paused) {
      video.play()
      setCurrentPlaying(id)
    } else {
      video.pause()
      setCurrentPlaying(null)
    }
  }

  return (
    <div className='music-container'>
      {isLoading ? (
        <p className=' text-white text-2xl '>Loading...</p>
      ) : posts.length === 0 ? (
        <p className=' text-white text-2xl '>No music found.</p>
      ) : (
        posts.map(post => (
          <div
            className='music-card relative'
            key={post._id}
            onClick={() => togglePlay(post._id)} // 🔥 tap anywhere
          >
            <video
              className='music-video '
              ref={el => (videoRefs.current[post._id] = el)}
            >
              <source src={post.image} type='video/mp4' />
              {post.title}
            </video>
            <div className='flex items-center gap-3 absolute bottom-13 left-5'>
              <img
                className='h-9 w-9 rounded-full object-cover border-2 border-white'
                src='https://i.pinimg.com/736x/62/01/0d/62010d848b790a2336d1542fcda51789.jpg'
                alt='dp image'
              />
              <p className='text-white font-semibold text-sm'>
                {post.artist.username}
              </p>
            </div>
            <p className='music-title absolute bottom-3 left-6 '>
              {post.title}
            </p>
          </div>
        ))
      )}
    </div>
  )
}

export default AllPosts
