
import { CancelRounded, ContactsSharp } from '@material-ui/icons';
import React, { useContext, useEffect, useState } from 'react';
import ConversationItem from './conversationItem';
import Input from "./input";
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
const Conversations = (props) => {

  const { userInfo, convId, setConvId } = useContext(AuthContext);

  const [contacts, setContacts] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchRes, setSearchRes] = useState([]);
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
          console.log(res.data.conversation[0])
          setConvId(res.data.conversation[0]);
        }
      } catch (err) {
        console.log(err.response.data)
      }
    }

    fetchData()
  }, [userInfo])

  async function  changeHandler (query) { 
    try {
      console.log(40)
      let res = null;
      setSearching(true);
      if (query) {
        res = await axios.get(`http://localhost:8080/find-conversations/${query}`);
      console.log(res)
      setSearchRes(res.data.result)
      }
    } catch (err) {
      
      console.log(err)
    }
  }

 

  let items = contacts.map((item, index) => (

    <div key={index} className='conv-item-container'>
      <ConversationItem item={item} index={index} />
    </div>
  ))

  let searchItems = searchRes.map((item, index) => (

    <div key={index} className='conv-item-container'>
      <ConversationItem item={item} index={index} />
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

  function SearchResult() {
    return (<div className='convos-sec'>
      <h2>Search Result</h2>
      <div className='all-convs'>
        {searchItems}
      </div>
    </div>)

  }

   function cancelHandler(){
    document.getElementById("search-bar").value=null 
     setSearching(false)
   }


  return (


    <div className="Conversations">
      <div className='convs-header'>

        <div className='input-container'>
          <Input id="search-bar" onChange={(e)=>changeHandler(e.target.value)} type="text" placeholder="find or start conversation" />
         {searching && <CancelRounded onClick={ cancelHandler  }/>}
        </div>

        <div className="conticon-container">
          <ContactsSharp />
          <label>Contacts</label>
        </div>
      </div>
         
         { searching ?<SearchResult/> : <List />}


    </div>
  );
}

export default Conversations;
