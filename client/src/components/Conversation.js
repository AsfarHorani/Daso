
import {  Image, InfoRounded, MenuSharp} from '@material-ui/icons';
import React, { useState } from 'react';
import Message from './message';
import ContactInfo from './ContactInfo';
const Conversation = (props) => {
    const [msgs, setMsgs] = useState([

        {
            from: "1",
            text: "Hi how are you, loremasidnasidpas pdn sdpasndpsa ndp asndpasndpn aspdn aspnd pas npd nsadpnas pdn naspdinas pdnas pdn aspdnasp ondp asnd pnas pdnas pdnaspdnaspidasp ndp asn dpias dn sp",
            userId: 1
        },
        {
            from: "2",
            text: "I am fine what about you?",
            userId: 2
        },
        {
            from: "1",
            text: "Hi how are you, loremasidnasidpas pdn sdpasndpsa ndp asndpasndpn aspdn aspnd pas npd nsadpnas pdn naspdinas pdnas pdn aspdnasp ondp asnd pnas pdnas pdnaspdnaspidasp ndp asn dpias dn sp",
            userId: 1
        },
        {
            from: "2",
            text: "I am fine what about you?",
            userId: 2
        },
        {
            from: "1",
            text: "Hi how are you, loremasidnasidpas pdn sdpasndpsa ndp asndpasndpn aspdn aspnd pas npd nsadpnas pdn naspdinas pdnas pdn aspdnasp ondp asnd pnas pdnas pdnaspdnaspidasp ndp asn dpias dn sp",
            userId: 1
        },
        {
            from: "2",
            text: "I am fine what about you?",
            userId: 2
        },
        {
            from: "1",
            text: "Hi how are you, loremasidnasidpas pdn sdpasndpsa ndp asndpasndpn aspdn aspnd pas npd nsadpnas pdn naspdinas pdnas pdn aspdnasp ondp asnd pnas pdnas pdnaspdnaspidasp ndp asn dpias dn sp",
            userId: 1
        },
        {
            from: "2",
            text: "I am fine what about you?",
            userId: 2
        },
        {
            from: "1",
            text: "Hi how are you, loremasidnasidpas pdn sdpasndpsa ndp asndpasndpn aspdn aspnd pas npd nsadpnas pdn naspdinas pdnas pdn aspdnasp ondp asnd pnas pdnas pdnaspdnaspidasp ndp asn dpias dn sp",
            userId: 1
        },
        {
            from: "2",
            text: "I am fine what about you?",
            userId: 2
        },
        {
            from: "1",
            text: "Hi how are you, loremasidnasidpas pdn sdpasndpsa ndp asndpasndpn aspdn aspnd pas npd nsadpnas pdn naspdinas pdnas pdn aspdnasp ondp asnd pnas pdnas pdnaspdnaspidasp ndp asn dpias dn sp",
            userId: 1
        },
        {
            from: "2",
            text: "I am fine what about you?",
            userId: 2
        }

    ]);

    let mgsComp = null;
    if (msgs) {
        mgsComp = msgs.map((msg,index) => {
            return <Message  key={index} msg={msg} />
        })
    }

    return <div className='conversation-screen'>
        <div className='cs-header'>
            <div className="cs-displayName">
                <MenuSharp  onClick={props.toggleSidebar}  className="togglebar"/>
                <h2>Mahnoor</h2>

            </div>

            <div className="right-nav">
                <InfoRounded onClick={props.toggleRightbar} className="user-info"/>
            </div>
        </div>

        <div className="cs-body">
            {/* <div className='contact-info'>
                <AccountCircleSharp className="contact-icon" />
                <h4>Mahnoor Khan </h4>
                <p>Your friend since 24 december 2021</p>

            </div> */}
            <ContactInfo/>

            <div className='messages'>
                {mgsComp}
            </div>

        </div>

        <div className='cs-footer'>
            <div className="ft-content">
                <input placeholder='Write your message..' type="text" />
                <div className='othe-fet'>
                    <Image />
                </div>
            </div>
        </div>  
    </div>
}

export default Conversation