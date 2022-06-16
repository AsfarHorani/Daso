import React, { useContext } from 'react'
import { ImageRounded, PersonSharp } from '@material-ui/icons';
import { AccountCircle } from '@material-ui/icons';
import { Avatar } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function ConversationItem({ item, index }) {
    let { contactInfo, setContactInfo, userInfo } = useContext(AuthContext)
    let navigate = useNavigate();
     
    

    const clickHandler = () => {
        setContactInfo(item)
        console.log(item)
        if (item.convoId) {
            
            navigate(`/t/${item.convoId}`);
            return
        }

        axios.post("http://localhost:8080/createConversation", {
            user1: userInfo.userId,
            user2: item._id
        }).then(data => {
            console.log(data.data.converstaion)
            navigate(`/t/${data.data.converstaion._id}`);
        
        
        }).catch(err => {
            console.log(err)
        })


    }
    return (

        <div key={index} className="conversations-item">
            <div className="Link" onClick={()=>clickHandler()}>
                <div >
                    {item.imageUrl ? <Avatar src={`http://localhost:8080/${item.imageUrl}`} className="convo-avatar" /> : <AccountCircle className="convo-icon" />}
                </div>
                <div className="convo-display">
                    {item.name}
                </div>
            </div>
        </div >

    )
}

export default ConversationItem