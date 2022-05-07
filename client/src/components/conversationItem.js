import React from 'react'
import { PersonSharp } from '@material-ui/icons';
import { AccountCircle } from '@material-ui/icons';

function conversationItem({item,index}) {
    return (
        <div key={index} className="conversations-item">
            <div >
                {item.icon ? item.icon : <AccountCircle className="convo-icon"/> }
            </div>
            <div className="convo-display">
                {item.display}
            </div>
        </div>
    )
}

export default conversationItem