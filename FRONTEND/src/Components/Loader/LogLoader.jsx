import React from 'react'
import './LogLoader.css'

const LogLoader = ({ value }) => {
  return (
    <div className='login-loader-container'>
      <div className='login-spinner'></div>
      <p className='login-text'>{value}</p>
    </div>
  )
}

export default LogLoader
