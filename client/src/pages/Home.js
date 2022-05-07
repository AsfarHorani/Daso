import Sidebar from "../components/sidebar";
import React, { useState ,useEffect} from 'react';
import Conversation from '../components/Conversation';
import { Backdrop } from "@material-ui/core";
import RightInfoBar from "../components/RightInfoBar";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [openRightbar,setOpenRightbar] = useState(false);
    const navigate = useNavigate()
    useEffect(()=>{
        if(!props.isAuth){
            navigate('/login');
        }
    },[props.isAuth])


    const toggleSidebar = () => {
        console.log(openSidebar)
        setOpenSidebar(!openSidebar);
    }

    const toggleRightbar = () => {
        
        setOpenRightbar(!openRightbar);
    }


    return (
        <>

            <Sidebar open={openSidebar}  logoutHandler={props.logoutHandler} />
            <Conversation toggleSidebar={toggleSidebar}   toggleRightbar={toggleRightbar}  />
            <Backdrop    className="backdrop"     sx={{ color: '#fff'}}
             open={openSidebar || openRightbar } onClick={()=>{
            setOpenRightbar(false); 
             setOpenSidebar(false)}} />
            <RightInfoBar  open={openRightbar}  />
        </>
    )
};

export default Home;