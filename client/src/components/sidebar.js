import React, { useState } from 'react';
import Conversation from './Conversation';
import Conversations from './conversations';
import SidebarOption from './sidebarOption';
import { HomeSharp} from '@material-ui/icons';
import { PersonSharp } from '@material-ui/icons';
import { FaceRounded } from '@material-ui/icons';


const Sidebar = (props) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const sidebarNavItems = [
        {
            display: 'Home',
            icon: <i className='bx bx-user'></i>,
            to: '/user',
            section: 'user',
            icon: <HomeSharp className="Sidebar-icon"/>
        },

        {
            display: 'Profile',
            icon: <i className='bx bx-star'></i>,
            to: '/findfirends',
            section: 'find friends',
            icon: <PersonSharp className="Sidebar-icon"/>
        },

    ]


    return (
        <div className="Sidebar">

            <div className='sidebar-menu' >
                 
                 <div className="logo-container">
                     <FaceRounded  className="Sidebar-icon logo"/>
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
