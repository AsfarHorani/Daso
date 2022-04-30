import React from 'react'
import { Link } from 'react-router-dom'

function sidebarOption(props) {
    return (
        <div className="Sidebar-item">
            <Link className='link' to={props.item.to} key={props.index}>

                <div>
                    {props.item.icon}
                </div>


            </Link>
        </div>
    )
}

export default sidebarOption