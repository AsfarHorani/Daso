import React, { useState,useEffect, useContext } from 'react';
import Conversations from './conversations';
import SidebarOption from './sidebarOption';
import { PersonSharp } from '@material-ui/icons';
import { FaceRounded, ExitToApp } from '@material-ui/icons';
import { AuthContext } from '../context/AuthContext';

const Sidebar = (props) => {
    
    const [activeIndex, setActiveIndex] = useState(0);
    const {logoutHandler} = useContext(AuthContext);
        const sidebarNavItems = [

        {
            display: 'Profile',
            to: '/myprofile',
            section: 'Profile',
            onClick: () => { },
            icon: <PersonSharp className="Sidebar-icon" />
        }, {
            diplay: 'logout',
            to: '/login',
            onClick: logoutHandler,
            section: 'Logout',
            icon: <ExitToApp className="Sidebar-icon" />
        }

    ]
    useEffect(()=>{
        console.log("rendering app..")
    },[])
    

    return (
        <div className={props.open ? "Sidebar active" : "Sidebar"}>

            <div className='sidebar-menu' >

                <div className="logo-container">
                    <FaceRounded className="Sidebar-icon logo" />
                </div>


                {
                    sidebarNavItems.map((item, index) => (

                        <SidebarOption  key={index} item={item} index={index} />

                    ))
                }
            </div>
            <Conversations />


        </div>

    );
}

export default Sidebar;
