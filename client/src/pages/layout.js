import Sidebar from "../components/sidebar";
import React, { useState } from 'react';
import Conversation from '../components/Conversation';

const clicked = (id) => {
    console.log(id)
}
const AppLayout = (props) => {
    return (
        <>
            <Sidebar />
            <Conversation />
        </>
    )
};

export default AppLayout;