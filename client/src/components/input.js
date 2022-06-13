import React from 'react'

function input({id,type,placeholder,onChange}) {
  return (
    <input
    className='input'
    type ={type}
    placeholder={placeholder}
    onChange={onChange}
    id={id}
    />
  )
}

export default input