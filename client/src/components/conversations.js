
import { ContactsSharp } from '@material-ui/icons';
import React, { useContext, useEffect, useState } from 'react';
import ConversationItem from './conversationItem';
import Input from "./input";
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
const Conversations = (props) => {

  const { userInfo,convId,setConvId } = useContext(AuthContext);
  
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
   console.log("rendering...")
    async function fetchData() {
   
      
      console.log(userInfo)
      try {
        let res = null;
        console.log(userInfo)
        if (userInfo) {
          res = await axios.get(`http://localhost:8080/get-conversation/${userInfo.userId}`);
       
          setContacts(res.data.conversation)
          setConvId(res.data.conversation[0].convoId);
        }
      } catch (err) {
        console.log(err.response.data)
      }
    }

    fetchData()
  }, [userInfo])

 

  // const clickHandler = (id) => {
  //   props.clicked(id)
  // }



  let items = contacts.map((item, index) => (

    <div key={index} className='conv-item-container'>
      <ConversationItem  item={item} index={index} />
    </div>
  ))

  function List() {
    return (<div className='convos-sec'>
      <h2>Chats</h2>

      <div className='all-convs'>
        {items}
      </div>
    </div>)
  }

  return (


    <div className="Conversations">
      <div className='convs-header'>

        <div className='input-container'>
          <Input type="text" placeholder="find or start conversation" />
        </div>

        <div className="conticon-container">
          <ContactsSharp />
          <label>Contacts</label>
        </div>
      </div>
      <List />


    </div>
  );
}

export default Conversations;
