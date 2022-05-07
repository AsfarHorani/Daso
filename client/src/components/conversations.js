
import { ContactsSharp } from '@material-ui/icons';
import React, { useState } from 'react';
import ConversationItem from './conversationItem';
import Input from "./input";
const Conversations = (props) => {

  const [activeIndex, setActiveIndex] = useState(0);
  const allChats = [
    {
      display: 'Ali',
      icon: null,
      to: '/user',
      section: 'user',
      id: 1
    }, {
      display: 'Mahnoor',
      icon: null,
      id: 1,
      section: 'user'
    },
    {
      display: 'Fakiha',
      icon: null,
      id: 1,
      section: 'user'
    },




  ]

  const clickHandler = (id) => {
    props.clicked(id)
  }


  let items = allChats.map((item, index) => (
     
    <div key={index} className='conv-item-container'>
    <ConversationItem  item={item} index={index} />
    </div>
  ))


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
      <div className='convos-sec'>
        <h2>Chats</h2>

        <div className='all-convs'>
          {items}
        </div>
      </div>
    </div>
  );
}

export default Conversations;
