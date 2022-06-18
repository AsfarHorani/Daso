import React from 'react'
import { Link } from 'react-router-dom'

function sidebarOption(props) {
    let data =null;
    if(props.item.to){
         data = (<Link className='link' to={props.item.to} key={props.index} onClick={props.item.onClick}>

        <div>
            {props.item.icon}
        </div>


    </Link>)
    }else{
     data =    (<div className='link'  key={props.index} onClick={props.item.onClick}>

        <div>
            {props.item.icon}
        </div>


    </div>)
    }
    return (
        <div className="Sidebar-item">
            
            {data}
        </div>
    )
}

export default sidebarOption