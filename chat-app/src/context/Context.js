import React,{createContext,useState,useEffect} from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import pusherJs from 'pusher-js';

const AuthContext = createContext();


export default AuthContext




export const AuthProvider = ({children})=>{


    const endpointURL = 'http://127.0.0.1:8000/api/token/'
    const endpointRefreshURL = 'http://127.0.0.1:8000/api/token/refresh/'
    const endpointRoom = "http://127.0.0.1:8000/api/room"
    const endpointMessage = 'http://127.0.0.1:8000/api/message'
    const endpointRegister = 'http://127.0.0.1:8000/api/user/0'


    let navigate = useNavigate();


    const [authTokens,setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [user,setUser] = useState(()=>authTokens ? jwt_decode(authTokens.access) : null)
    const [rooms,setRooms] = useState([])
    const [messages,setMessages] = useState([])

    const [loading, setLoading] = useState(false)
    const [roomLoading,setRoomloading] = useState(false)
    const [messageLoading,setMessageLoading] = useState(false)

    // console.log(authTokens.access)



    const loginUser = async (e)=>{
      e.preventDefault()
      if(e.target.username.value && e.target.password.value){

        setLoading(true)
        const response = await fetch(endpointURL,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value,'password':e.target.password.value})
        })
        const data = await response.json()
        if(response.status===200){
            localStorage.setItem("authTokens",JSON.stringify(await data))
            setAuthTokens(await data)
            setUser(jwt_decode(await data.access))
            setLoading(false)
            // console.log(await authTokens)
            // console.log(await user)
        }else{
            alert("Username/Password wrong")
            setLoading(false)
        }}
    }

    const signupUser = async (e)=>{
      setLoading(true)
      e.preventDefault()
      const response = await fetch(endpointRegister,{
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({'username':e.target.username.value,'password':e.target.password.value})
      })
      const data = await response.json()
      if(response.status===200){
          loginUser(data)
          console.log(data)
          navigate('/login')
          setLoading(false)
      }else{
          alert("SIgnup failed. Try again")
          setLoading(false)
      }
  }

    const logoutUser = ()=>{
        localStorage.removeItem('authTokens')
        setAuthTokens()
        setUser(null)
        setRooms([])
        setMessages([])
        navigate('/login');
    }

    const updateLogin = async ()=>{
        const response = await fetch(endpointRefreshURL,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })
        const data = await response.json()
        if(response.status===200){
            setAuthTokens(await data)
            setUser(jwt_decode(await data.access))
            localStorage.setItem("authTokens",JSON.stringify(await data))
          }else{
            logoutUser();
        }

    }

    // to update token after 4 min 
    useEffect(()=>{

      let interval = null;
      if (authTokens) {
        interval = setInterval(() => {
          updateLogin()
        }, 240000)
      }
      return () => clearInterval(interval);
    },[authTokens])

    // to get rooms 
    useEffect(()=>{
      if(authTokens){
        setRoomloading(true)
        const fetchRooms = async()=>{
          try {
            const response = await fetch(endpointRoom,{
              method:'GET',
              headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens?.access),
              }
            });
            if(response.status===200){
              const data = await response.json();
              setRooms(await data)
              setRoomloading(false)
            }
          } catch (error) {
            console.log(error);
            setRoomloading(false)
          }
        }
        fetchRooms()}
      },[user]);



//   to get message 
  useEffect(()=>{
    if(authTokens){
      setMessageLoading(true)
    const fetchMessage = async()=>{
      try {
        const response = await fetch(endpointMessage,{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authTokens?.access),
          }
        });
        if(response.status===200){
          const data = await response.json();
          setMessages(await data)
          setMessageLoading(false)
        }else if(response.statusText==='Unauthorized'){
          logoutUser()
          setMessageLoading(false)
        }
      } catch (error) {
        console.log(error);
        setMessageLoading(false)
      }
    }
    fetchMessage()}
  },[user]);

  useEffect(()=>{
     const pusher = new pusherJs('f12d9df33bdc80d7947b', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('chat');
    channel.bind('message', function(data) {
      setMessages((messages) => [...messages, data]);
    });

    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }
  },[messages])

    

    

  return (
    <AuthContext.Provider value={{loginUser:loginUser,logoutUser:logoutUser,
    authTokens:authTokens,userName:user?.name,
    userID:user?.user_id,rooms:rooms,
    setRooms:setRooms,messages:messages,
    setMessages:setMessages,
    signupUser:signupUser,
    loading:loading,setLoading:setLoading,
    roomLoading:roomLoading,messageLoading:messageLoading,
    setRoomloading:setRoomloading}}>
        {children}
    </AuthContext.Provider>
  )
}
