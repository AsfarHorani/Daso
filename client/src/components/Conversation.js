
import { Image, InfoRounded, MenuSharp, SendRounded as Send } from '@material-ui/icons';
import React, { useState, useEffect, useContext, useRef } from 'react';
import Message from './message';
import ContactInfo from './ContactInfo';
import axios from 'axios';
import { useOutletContext, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import openSocket from 'socket.io-client';
const Conversation = (props) => {
    let { convoId } = useParams();
    let { token, userInfo, setContactInfo, contactInfo } = useContext(AuthContext)
    const [text, setText] = useState("");
    const [msgs, setMsgs] = useState([]);
    const { toggleSidebar, toggleRightbar } = useOutletContext();
    const [image, setImage] = useState(null);
    const  [imageUrl,setImageUrl] = useState(null);
    useEffect(() => {
        console.log("rendering..")
        async function fetchData() {



            try {



                let ms = null
                if (convoId !== null && token !== null) {

                    ms = await axios.get(`http://localhost:8080/getMessages/${convoId}`, {
                        headers: {
                            Authorization: 'Bearer ' + token
                        }
                    });
                    setMsgs(ms.data.messages)
                    var messageBody = document.querySelector('#messageBody');
                    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;

                }



            } catch (err) {
                console.log(err.response.data)
            } finally {
                var messageBody = document.querySelector('#messageBody');
                messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;

            }

        }
        fetchData()


    }, [convoId, token]);


    useEffect(() => {
        const socket = openSocket('http://localhost:8080');
        socket.on('message', data => {
            if (data.action === 'send') {
                console.log("msg recieved")
                setMsgs(oldMsgs => [...oldMsgs, data.message])
                var messageBody = document.querySelector('#messageBody');
                messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;

            }
        })
    }, [])

useEffect(()=>{

    if(!image){
        setImageUrl(null)
        return
    }
    const url =URL.createObjectURL(image)
    console.log(url )
    setImageUrl(url);
},[image])


    async function sendMessage() {
        console.log(image, text, userInfo.userId)
        let formData = new FormData();
        formData.append('text', text);
        formData.append('image', image);
        formData.append('senderId', userInfo.userId);
        console.log(formData)

        try {
            if (text !== "" || image) {
                let msg = await axios.post(`http://localhost:8080/sendMessage/${convoId}`, formData, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    },

                })

                setText("");
                setImage(null)
                setImageUrl(null)

            }
        } catch (err) {
            console.log(err)
        }
    }

    let mgsComp = null;
    if (msgs) {
        mgsComp = msgs.map((msg, index) => {
            return <Message key={index} msg={msg} />
        })
    }


    function openDialog() {
        document.getElementById('input-file').click();
    }


    return <div className='conversation-screen'>
        <div className='cs-header'>
            <div className="cs-displayName">
                <MenuSharp onClick={toggleSidebar} className="togglebar" />
                <h2>{contactInfo.name}</h2>

            </div>

            <div className="right-nav">
                <InfoRounded onClick={toggleRightbar} className="user-info" />
            </div>
        </div>

        <div id="messageBody" className="cs-body">

            <ContactInfo />

            <div className='messages'>
                {mgsComp}
            </div>

        </div>

        <div className='cs-footer'>
            <div className="ft-content">
                <textarea onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : console.log(false)} id="myInput" value={text} onChange={e => setText(e.target.value)} placeholder='Write your message..' type="text" />
                <div className='oth-fet'>
                    {image?<img className='prevImage' src={imageUrl} /> : <Image aria-label="upload picture" onClick={openDialog} /> }
                    <input id="input-file"
                        onChange={(e) =>  { setImage(e.target.files[0]); }}
                        type="file"
                        name="image" style={{ display: 'none' }} />

                </div>

            </div>

            <div className='sendButton'>
                <Send id="myBtn" className="sendbtn" onClick={() => sendMessage()} />
            </div>
        </div>
    </div>
}

export default Conversation