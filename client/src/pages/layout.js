import Sidebar from "../components/sidebar";
import React, { useState } from 'react';
import Conversation from '../components/Conversation';
import { Backdrop } from "@material-ui/core";
import RightInfoBar from "../components/RightInfoBar";

const AppLayout = (props) => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [openRightbar,setOpenRightbar] = useState(false);
    console.log(openRightbar)
    const toggleSidebar = () => {
        console.log(openSidebar)
        setOpenSidebar(!openSidebar);
    }

    const toggleRightbar = () => {
        
        setOpenRightbar(!openRightbar);
    }


    return (
        <>

            <Sidebar open={openSidebar}/>
            <Conversation toggleSidebar={toggleSidebar}   toggleRightbar={toggleRightbar}  />
            <Backdrop    className="backdrop"     sx={{ color: '#fff'}}
             open={openSidebar || openRightbar } onClick={()=>{
            setOpenRightbar(false); 
             setOpenSidebar(false)}} />
            <RightInfoBar  open={openRightbar}  />
        </>
    )
};

export default AppLayout;