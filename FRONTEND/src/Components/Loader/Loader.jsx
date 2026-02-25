import React from 'react'
import './Loader.css'

const Loader = ({ text = 'Loading...' }) => {
  return (
    <div className='loader-overlay'>
      <div className='loader-box'>
        <div className='music-loader'>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p className='loader-text'>{text}</p>
      </div>
    </div>
  )
}

export default Loader
