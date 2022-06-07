import Sidebar from "../components/sidebar";
import React, { useState ,useEffect, useContext} from 'react';
import Conversation from '../components/Conversation';
import { Backdrop } from "@material-ui/core";
import RightInfoBar from "../components/RightInfoBar";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = (props) => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [openRightbar,setOpenRightbar] = useState(false);
    const {isAuth,convId} = useContext(AuthContext);
    const navigate = useNavigate()
    useEffect(()=>{   
        if(!isAuth){
            navigate("/login");
        }else{
            navigate(`/t/${convId}`)
        }
    console.log("rendering..")    
    },[isAuth,convId])
    
    
    const toggleSidebar = () => {
      
        setOpenSidebar(!openSidebar);
    }

    const toggleRightbar = () => {
        
        setOpenRightbar(!openRightbar);
    }


    return (
        <>

            <Sidebar open={openSidebar}   />
            <Outlet context={{toggleSidebar, toggleRightbar}}  />
            <Backdrop    className="backdrop"     sx={{ color: '#fff'}}
             open={openSidebar || openRightbar } onClick={()=>{
             setOpenRightbar(false); 
             setOpenSidebar(false)}} />
            <RightInfoBar  open={openRightbar}  />
        </>
    )
};

export default Home;