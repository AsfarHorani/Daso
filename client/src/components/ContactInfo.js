import React, { useContext, useEffect } from 'react'
import { AccountCircleSharp} from '@material-ui/icons';
import { AuthContext } from '../context/AuthContext';

function ContactInfo() {
     const {contactInfo} = useContext(AuthContext)
     useEffect(()=>{
         console.log("rendering...")
     },[])
    return (
        <div className='contact-info'>
            <AccountCircleSharp className="contact-icon" />
            <h4>{contactInfo.name} </h4>
            <p>Your friend since 24 december 2021</p>

        </div>
    )
}

export default ContactInfo