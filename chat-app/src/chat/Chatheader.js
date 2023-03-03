import React,{useContext, useEffect, useState} from 'react'
import './chat.css'
import { MdAccountCircle } from 'react-icons/md'
import {RiAttachment2} from 'react-icons/ri'
import {FiMoreVertical} from 'react-icons/fi'
import AuthContext from '../context/Context'
import { useParams } from 'react-router-dom'


export default function Chatheader() {

    let {userName,messages} = useContext(AuthContext);

    const {roomID} = useParams()
    const {rooms} = useContext(AuthContext)

    const [room,setRoom] = useState([])
    if(!userName){
        userName = "No Name"
    }

    useEffect(()=>{
        setRoom(rooms.filter((room)=>room.id==roomID))
    },[roomID,rooms])



  return (
    <div className="chatheader">
        <div className="chatheaderLeft">
            <MdAccountCircle className='avatar' color='white' size={'42'}/>
            <div className="name_info">
                {room ? 
                <h4>{userName==room[0]?.profile1 ? rooms[0]?.profile2 : room[0]?.profile1}</h4>
               : "" }
                <small>{roomID ? "last Seen " + messages[messages.length-1]?.sent_at : ''}</small>
            </div>
        </div>
        <div className="chatheaderRight">
            <RiAttachment2 className='more_icon' color='white' size={'24'} style={{marginLeft:'12px'}}/>
            <FiMoreVertical className='more_icon' color='white' size={'22'} style={{marginLeft:'12px'}}/>
        </div>
    </div>
    )
}
