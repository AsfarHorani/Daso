import React, { useState } from 'react';
import Conversation from './Conversation';
import Conversations from './conversations';
import SidebarOption from './sidebarOption';
import { HomeSharp } from '@material-ui/icons';
import { PersonSharp } from '@material-ui/icons';
import { FaceRounded,ExitToApp } from '@material-ui/icons';


const Sidebar = (props) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const sidebarNavItems = [
        
        {
            display: 'Profile',
            icon: <i className='bx bx-star'></i>,
            to: '/myprofile',
            section: 'Profile',
            icon: <PersonSharp className="Sidebar-icon" />
        },{
            diplay:'logout',
            to:'/login',
            section: 'Logout',
            icon: <ExitToApp className="Sidebar-icon"/>
        }

    ]


    return (
        <div className={props.open ? "Sidebar active" : "Sidebar"}>

            <div className='sidebar-menu' >

                <div className="logo-container">
                    <FaceRounded className="Sidebar-icon logo" />
                </div>


                {
                    sidebarNavItems.map((item, index) => (

                        <SidebarOption item={item} index={index} />

                    ))
                }
            </div>
            <Conversations />


        </div>

    );
}

export default Sidebar;
