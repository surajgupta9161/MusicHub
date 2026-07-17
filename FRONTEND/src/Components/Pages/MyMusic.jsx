import { useContext, useState, useRef } from 'react'
import { UserContext } from '../../Context/UserContext'
import UpdateMusic from './UpdateMusic'

const MyMusic = () => {
  const { user, userMusic } = useContext(UserContext)
  const [activeVideo, setActiveVideo] = useState(null)
  const videoRefs = useRef({})

  const [openEdit, setOpenEdit] = useState(false)
  const [selectedMusic, setSelectedMusic] = useState(null)

  if (!user) return <p>Loading user...</p>

  //   const myMusic = posts.filter(post => post.artist._id === user._id)

  const handleVideoClick = id => {
    const video = videoRefs.current[id]
    if (!video) return

    // agar same video click
    if (activeVideo === id) {
      video.pause()
      setActiveVideo(null)
    } else {
      // stop previous
      if (activeVideo) {
        const prev = videoRefs.current[activeVideo]
        if (prev) {
          prev.pause()
          prev.currentTime = 0
        }
      }

      // play new
      setActiveVideo(id)
      video.play()
    }
  }

  return (
    <div>
      <h2 className='text-xl mt-3 mb-2'>My Uploads</h2>
      {userMusic?.length === 0 ? (
        <p className='text-xl mt-2 mb-2'>No music uploaded yet</p>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          {userMusic?.map(m => (
            <div
              key={m._id}
              className='bg-[#070a11ec]  max-w-80 max-h-150 p-3 rounded-lg shadow-md'
            >
              <button
                onClick={() => {
                  setSelectedMusic(m)
                  setOpenEdit(true)
                }}
                className='px-3 py-1.5 text-sm rounded-md border border-zinc-600 bg-zinc-900 text-zinc-100 hover:bg-zinc-800 hover:border-zinc-400 transition-all duration-200 cursor-pointer'
              >
                Edit
              </button>
              {/* 🎬 Video */}
              <video
                ref={el => (videoRefs.current[m._id] = el)}
                src={m.image}
                onClick={() => handleVideoClick(m._id)}
                className={`cursor-pointer rounded-md transition-all duration-300 
                ${activeVideo === m._id ? 'scale-110 z-10' : 'scale-100'}
                w-full h-40 object-cover`}
              />

              {/* 🎵 Title */}
              <p className='text-white mt-2 font-semibold text-sm'>{m.title}</p>
            </div>
          ))}
        </div>
      )}
      {openEdit && (
        <UpdateMusic music={selectedMusic} onClose={() => setOpenEdit(false)} />
      )}
    </div>
  )
}

export default MyMusic
