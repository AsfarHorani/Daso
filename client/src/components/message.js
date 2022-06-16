import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';

function Message({msg}) {
    const {userInfo} = useContext(AuthContext);
    console.log(msg.imageUrl)
    return (
        <div     className={msg.sender===userInfo.userId? 'message mymsg':"message"}>

              { msg.imageUrl && <img className='msg-img' src={"http://localhost:8080/"+ msg.imageUrl} />}

            <div className='text-container'>
                <p className="msg-text">{msg.text}</p>
            </div>

        </div>
    )
}

export default Message;