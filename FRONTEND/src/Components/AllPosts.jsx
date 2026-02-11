import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

const AllPosts = () => {
  const [posts, setPosts] = useState([])
  const videoRefs = useRef({})
  const [currentPlaying, setCurrentPlaying] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/auth/allMusic')
      .then(res => {
        setPosts(res.data.musics)
        setIsLoading(false)
      })
      .catch(err => {
        setIsLoading(false)
        return err.response
          ? alert(err.response.data.message)
          : alert('Error fetching music')
      })
  }, [])

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
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p>No music found.</p>
      ) : (
        posts.map(post => (
          <div
            className='music-card'
            key={post._id}
            onClick={() => togglePlay(post._id)} // 🔥 tap anywhere
          >
            <video
              className='music-video'
              ref={el => (videoRefs.current[post._id] = el)}
            >
              <source src={post.image} type='video/mp4' />
            </video>
            <h2 className='music-title'>{post.title}</h2>
          </div>
        ))
      )}
    </div>
  )
}

export default AllPosts
