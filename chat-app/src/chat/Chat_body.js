import React,{useContext,useEffect,useState} from 'react'
import { MdAccountCircle } from 'react-icons/md'
import { useParams } from 'react-router-dom';
import RingLoader from 'react-spinners/RingLoader';
import AuthContext from '../context/Context';


export default function Chat_body() {

    let {userName,messageLoading,userID,messages} = useContext(AuthContext);



    const {roomID} = useParams();
    const [roomMessages,setRoomMessages] = useState(messages);

    if(!userName){
        userName="No Name"
        userID = 0
    }

    useEffect(() => {
        const filteredMessages = messages.filter(message => message.room == parseInt(roomID)).reverse();
        setRoomMessages(currentMessages => [...filteredMessages]);
    }, [roomID, messages]);

      

      
   

  return (
    <div className="chat_body">

        {/* message recieved */}
        {roomID ? messageLoading ? <div style={{display:'flex',justifyContent:'center'}}><RingLoader size={50} color='#34ac9e'/></div> : roomMessages.map((message)=>{
            
            return(

                
                
        <div key={message.id} className={userName===message.sender ? "chat_message recieved" :"chat_message"}>
            <span className='avatar_span'><MdAccountCircle/></span>
            <div className={userName===message.sender ? "message chat_recieved" : "message"}>
                <span className='chat_name'>{message.sender}</span>
                <div className={userName===message.sender ? "sent_message  chat_reciever" : "sent_message"}>
                    <p>{message.message}</p>
                    <span className='timeSpan'>{message.sent_at}</span>
                </div>
            </div>
        </div>
                )

        }) : <div style={{display:'flex',justifyContent:'center',alignItems:'center',placeItems:'center',margin:'1rem'}}>
        {/* <span className='avatar_span'><MdAccountCircle/></span> */}
        {/* <div className="message chat_recieved message"> */}
            <div className="sent_message  chat_reciever sent_message">
                <p>Find Your Friends, by searching them on search bar</p>
                {/* <span className='timeSpan'>{message.sent_at}</span> */}
            </div>
        {/* </div> */}
    </div>}
        {/* message sent 
        <div className="chat_message recieved">
            <span className='avatar_span'><MdAccountCircle/></span>
            <div className="message chat_recieved">
                <span className='chat_name'>Abul Kalam</span>
                <div className="sent_message chat_reciever">
                    <p>Whassup??????????????????????????????????????????????????</p>
                    <span className='timeSpan'>{new Date().toUTCString()}</span>
                </div>
            </div>
        </div>

        message recieved 
        <div className="chat_message">
            <span className='avatar_span'><MdAccountCircle/></span>
            <div className="message">
                <span className='chat_name'>Abul Kalam</span>
                <div className="sent_message">
                    <p>Whassup??????????????????????????????????????????????????</p>
                    <span className='timeSpan'>{new Date().toUTCString()}</span>
                </div>
            </div>
        </div>
         */}
        
    </div>
    )
}
