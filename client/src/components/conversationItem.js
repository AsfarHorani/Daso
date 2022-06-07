import React, { useContext } from 'react'
import { ImageRounded, PersonSharp } from '@material-ui/icons';
import { AccountCircle } from '@material-ui/icons';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ConversationItem({ item, index }) {
    let { contactInfo,setContactInfo } = useContext(AuthContext)
    
    return (

        <div onClick={()=>setContactInfo(item)} key={index} className="conversations-item">
            <Link className="Link" to={`/t/${item.convoId}`}>
            <div >
                {item.imageUrl ? <Avatar src={`http://localhost:8080/${item.imageUrl}`} className="convo-avatar" /> : <AccountCircle className="convo-icon" />}
            </div>
            <div className="convo-display">
                {item.name}
            </div>
        </Link>
            </div >
   
    )
}

export default ConversationItem