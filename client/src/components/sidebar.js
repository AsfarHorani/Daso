import React, { useState, useEffect, useContext } from 'react';
import Conversations from './conversations';
import SidebarOption from './sidebarOption';
import { PersonSharp } from '@material-ui/icons';
import { FaceRounded, ExitToApp } from '@material-ui/icons';
import { AuthContext } from '../context/AuthContext';
import { Modal,Box,Typography  } from '@material-ui/core';

const Sidebar = (props) => {

    const [open, setOpen] = useState(false);
    const { logoutHandler } = useContext(AuthContext);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const sidebarNavItems = [

        {
            display: 'Profile',
            section: 'Profile',
            onClick: () => handleOpen(),
            icon: <PersonSharp className="Sidebar-icon" />
        }, {
            diplay: 'logout',
            to: '/login',
            onClick: logoutHandler,
            section: 'Logout',
            icon: <ExitToApp className="Sidebar-icon" />
        }

    ]
    useEffect(() => {
        console.log("rendering app..")
    }, [])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: "black",
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    return (
        <div className={props.open ? "Sidebar active" : "Sidebar"}>

            <div className='sidebar-menu' >

                <div className="logo-container">
                    <FaceRounded className="Sidebar-icon logo" />
                </div>


                {
                    sidebarNavItems.map((item, index) => (

                        <SidebarOption key={index} item={item} index={index} />

                    ))
                }
            </div>
            <Conversations />

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2>My profile</h2>
                    <p>We can edit our profile from here...</p>
                </Box>
            </Modal>
        </div>

    );
}

export default Sidebar;
