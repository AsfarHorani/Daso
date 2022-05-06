import React from 'react'

function message({msg}) {
    return (
        <div     className={msg.userId===1? 'message mymsg':"message"}>

              { msg.image && <img src={msg.image} />}

            <div className='text-container'>
                <p className="msg-text">{msg.text}</p>
            </div>

        </div>
    )
}

export default message;