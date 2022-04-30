import React from 'react'

function input({type,placeholder}) {
  return (
    <input
    className='input'
    type ={type}
    placeholder={placeholder}
    />
  )
}

export default input