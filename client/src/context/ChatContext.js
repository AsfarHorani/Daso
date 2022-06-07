import { createContext, useEffect, useReducer, useState } from "react";
import axios from 'axios';




export const ChatContext= createContext();

export const ChatContextProvider = ({children})=>{

    const [text, setText] = useState('');
    const [sender,setSender] = useState('');
    
    return (
     <ChatContext.Provider
     value={{

     }}>
         
         {children}
     </ChatContext.Provider>
 )

}