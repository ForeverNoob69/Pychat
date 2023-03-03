import React, { useContext,useEffect } from 'react'
import {MdAccountCircle} from 'react-icons/md'
import AuthContext from '../context/Context';
import Pusher from 'pusher-js'
import { Link, useNavigate } from 'react-router-dom';
import RingLoader from 'react-spinners/RingLoader'


export default function SidebarChat() {

  
  let navigate = useNavigate();


  const endpointRoom = 'http://127.0.0.1:8000/room'

  const {rooms,setRooms,messages} = useContext(AuthContext)
  let {userName,roomLoading} = useContext(AuthContext);

  useEffect(()=>{
     const pusher = new Pusher('f12d9df33bdc80d7947b', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('chat');
    channel.bind('room', function(data) {
      setRooms([...rooms,data]);
      console.log(rooms)
    });

    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }
  },[rooms])



// Sort messages by sent_at date in descending order
  const sortedMessages = messages.sort((a, b) => new Date(b.sent_at) - new Date(a.sent_at));

// Group messages by room ID
const groupedMessages = sortedMessages.reduce((acc, message) => {
  acc[message.room] = acc[message.room] || [];
  acc[message.room].push(message);
  return acc;
}, {});



  return (
    <>
      {roomLoading ? <div style={{display:'flex',justifyContent:'center'}}><RingLoader color="#34ac9e" /></div> : ""}
    {rooms.map((room)=>{
      const {id,profile1,profile2} = room;

      const lastMessage = groupedMessages[id] ? groupedMessages[id][0] : null;
    
      return(
        <>
        <Link to={`/chat/rooms/${id}`} className="sidebarChat" key={id}>
        <MdAccountCircle size={45} color={'gray'}/>
        <div className="sidebarChatInfo">
            <p className='chatName'>{userName === profile1 ? profile2 : profile1}</p>
            <p style={{color:"gray"}}>{lastMessage?.message}</p>
        </div>
    </Link>
        <hr style={{'width':'90%','color':'gray','opacity':'0.1','margin':'0 auto'}}/>
        </>
        )     
    })}
    </>
  )
}
