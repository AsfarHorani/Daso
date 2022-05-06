import React from 'react'
import ContactInfo from './ContactInfo'
function RightInfoBar({open}) {
  return (
    <div  className={open? 'RightInfoBar active': "RightInfoBar"} >
        <ContactInfo/>
    </div>
  )
}

export default RightInfoBar