import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';

function Message({msg}) {
    const {userInfo} = useContext(AuthContext);
    return (
        <div     className={msg.sender===userInfo.userId? 'message mymsg':"message"}>

              { msg.image && <img src={msg.image} />}

            <div className='text-container'>
                <p className="msg-text">{msg.text}</p>
            </div>

        </div>
    )
}

export default Message;