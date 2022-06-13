import React, { useContext, useEffect } from 'react'
import { AccountCircleSharp} from '@material-ui/icons';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Avatar } from '@material-ui/core';

function ContactInfo() {
     const {contactInfo,convId,userInfo,setContactInfo} = useContext(AuthContext)
      
     useEffect(()=>{
         console.log("rendering...")
         async function  fetchData (){
         try{
         if(!contactInfo.name){
           let user = await axios.get(`http://localhost:8080/get-user/${convId.contactId}`);
           setContactInfo(user.data.result)
         }
        }catch(err){
            console.log(err)
        }
    }

    fetchData();
     },[convId])
    return (
        <div className='contact-info'>
            <Avatar src={`http://localhost:8080/${contactInfo.imageUrl}`} className="contact-icon" />
            <h4>{contactInfo.name} </h4>
            <p>Your friend since 24 december 2021</p>

        </div>
    )
}

export default ContactInfo