const showImagekitError = error => {
  let msg = 'Image service error. Please try again.'

  // axios error
  if (error?.response) {
    msg = error.response.data?.message || ' failed'
  }
  // network error
  else if (error?.request) {
    msg = 'Network error while uploading image'
  }
  // js error
  else if (error?.message) {
    msg = error.message
  }

  toast.error(`📸 Image Error: ${msg}`, {
    duration: 5000,
    style: {
      background: '#020617',
      color: '#ff6b6b',
      border: '1px solid #ff6b6b',
      fontWeight: '600'
    }
  })
}

export default showImagekitError
