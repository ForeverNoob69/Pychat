import React, { useContext,useState,useEffect } from 'react'
import { useNavigation } from 'react-router-dom'
import './chat.css'
import Chatheader from './Chatheader'
import Chat_body from './Chat_body'
import Chat_footer from './Chat_footer'
import HashLoader from 'react-spinners/HashLoader'
import AuthContext from '../context/Context'
// import Pusher from 'pusher-js'


export default function Chat() {
  const navigate = useNavigation();

  const {authTokens} = useContext(AuthContext)
  if(!authTokens){
    navigate('/login'); 
  }


  // const endpointMessage = 'http://127.0.0.1:8000/message'

  // const [messages,setMessages] = useState([])

  // let {authTokens,logoutUser} = useContext(AuthContext);
  // if(!authTokens){
  //   authTokens = null
  // }

  // useEffect(()=>{
  //   const fetchMessage = async()=>{
  //     try {
  //       const response = await fetch(endpointMessage,{
  //         method:'GET',
  //         headers:{
  //           'Content-Type':'application/json',
  //           'Authorization':'Bearer ' + String(authTokens.access),
  //         }
  //       });
  //       if(response.status==200){
  //         const data = await response.json();
  //         setMessages(await data)
  //       }else if(response.statusText=='Unauthorized'){
  //         logoutUser()
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchMessage()
  // },[]);

  // useEffect(()=>{
  //    const pusher = new Pusher('f12d9df33bdc80d7947b', {
  //     cluster: 'ap2'
  //   });

  //   var channel = pusher.subscribe('chat');
  //   channel.bind('message', function(data) {
  //     setMessages([...messages,data]);
  //     console.log(messages)
  //   });

  //   return ()=>{
  //     channel.unbind_all();
  //     channel.unsubscribe();
  //   }
  // },[messages])

  // console.log(messages)

  return (
    
    <div className="chat">
       {navigate.state === "loading" && <HashLoader color="#36d7b7" />}
        <Chatheader/>
        <Chat_body/>
        <Chat_footer/>
    </div>
  )
}
