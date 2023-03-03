import React,{useState,useContext} from 'react'
import {BsEmojiLaughing} from 'react-icons/bs'
import './chat.css'
import {AiOutlineSend} from 'react-icons/ai'
import AuthContext from '../context/Context'
import { useParams } from 'react-router-dom'

export default function Chat_footer() {
  
  const endPointURL = 'http://127.0.0.1:8000/api/message'

  let {userName,userID,authTokens,rooms} = useContext(AuthContext);

  const {roomID} = useParams()
  const room = rooms.filter((room)=>room.id==roomID)

  if(!userName){
    userName="No Name"
    userID = 0
  }

  const [input,setInput] = useState('')

  const sendMessage = async (e)=>{
    e.preventDefault();
    const data = { 
      "message":input,
      "room":roomID,
      "sender":userName,
      "sender_ID":userID,
      "receiver_ID":room[0].user1==userID ? room[0].user2 : room[0].user1,
      "receiver":"ksds",
      "sent_at":new Date().toUTCString(),
     };

    const post = async ()=>{
      const response = await fetch(endPointURL,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens?.access),
        },
        body:JSON.stringify(data)
      })
      
    }

    setInput('')
    post();
      }

  return (
    <div className="chat_footer">
      <button className='btn emoji'>
        <BsEmojiLaughing className='emoji-logo' color='gray' size={'25'}/>
      </button>
      <form className='form' onSubmit={sendMessage}>
        <input type="text" size={45} value={input} onChange={e=>{setInput(e.target.value)}} placeholder='Type a message'/>
        <button type='submit' className='btn send'>
        <AiOutlineSend color='gray' size={'25'}/>
        </button>
      </form>
    </div>
  )
}
