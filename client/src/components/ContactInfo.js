import React from 'react'
import { AccountCircleSharp} from '@material-ui/icons';

function contactInfo() {
    return (
        <div className='contact-info'>
            <AccountCircleSharp className="contact-icon" />
            <h4>Mahnoor Khan </h4>
            <p>Your friend since 24 december 2021</p>

        </div>
    )
}

export default contactInfo