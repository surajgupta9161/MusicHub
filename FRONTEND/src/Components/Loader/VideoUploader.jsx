import './VideoUploader.css'

const VideoUploader = ({
  isUploadProgress = 0,
  text = 'Uploading video...'
}) => {
  return (
    <div className='upload-overlay'>
      <div className='upload-box'>
        <div className='upload-icon'>🎬</div>

        <div className='progress-container'>
          <div
            className='progress-bar'
            style={{ width: `${isUploadProgress}%` }}
          ></div>
        </div>

        <p className='upload-text'>{text}</p>
        <p className='upload-percent'>{isUploadProgress}%</p>
      </div>
    </div>
  )
}

export default VideoUploader
