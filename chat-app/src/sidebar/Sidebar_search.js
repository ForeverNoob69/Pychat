import React, { useContext, useEffect, useState } from 'react'
import {BsFillPersonPlusFill, BsSearch} from 'react-icons/bs'
import { MdAccountCircle } from 'react-icons/md'
import './sidebar.css'
import BarLoader from 'react-spinners/BarLoader'
import AuthContext from '../context/Context'
import ClipLoader from 'react-spinners/ClipLoader'


export default function Sidebar_search() {

  const [users,setUsers] = useState([])

  const {authTokens,userID,rooms,setRooms,setRoomloading} = useContext(AuthContext)

  const [query,setQuery] = useState([])
  const endpointURL = `http://127.0.0.1:8000/user/${query}`
  const endpointRoom = 'http://127.0.0.1:8000/room'


  useEffect(()=>{
    setUsers([])
    const fetchUsers = async()=>{
      try {
        const response = await fetch(endpointURL,{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
          }
        });
        if(response.status===200){
          const data = await response.json();
          const userIdsInRooms = rooms.reduce((acc, rooms) => {
            acc.push(rooms.user1, rooms.user2);
            return acc;
          }, []);

          const filteredData = await data.filter(user => !userIdsInRooms.includes(user.id))
          setUsers(await filteredData.length===0 ? [{"username":"No User found!","id":0}] : await filteredData)
        }
      } catch (error) {
        console.log(error);
      }
    }
    if(query.length>3){
      fetchUsers()
    }else{
      setUsers([])
    }
  },[query]);

  const addRoom =({userID,id,setRoomLoading})=>{

    setRoomloading(true)
    
    const data = {
      "user1":id,
      "user2":userID,
    }
    const fetchRooms = async()=>{
      try {
        const response = await fetch(endpointRoom,{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authTokens?.access),

          },
          body:JSON.stringify(data)
        });
        if(response.status===200){
          const newData = await response.json();
          setRooms([...rooms,await newData])
          setRoomloading(false)
        }
      } catch (error) {
        console.log(error);
        setRoomloading(false)
      }
    }
    fetchRooms()
    setQuery([])
    setUsers([])
  }


  return (
    <div className="sidebar_search">
        <div className="sidebar_searchContainer">
            <BsSearch className='search_icon'/>
            <input type="text" onChange={(e)=>setQuery(e.target.value)} placeholder='Search or Start a new Chat' size={45} />
            <div>{users.length===0 && query.length>3  ? 
             <BarLoader color="#36d7b7" className='loader' />
            : 
            !users ? <ClipLoader color="#36d7b7" size={25}/> : 
            users?.map((user)=>{
              const {id,username} = user;
              console.log(users.length, query.length)
              return(
                <div className="search_result">
                    {id===0 ? <p key={id}>{username}</p>
                    :
                  <div className="result_info">
                <MdAccountCircle size={25} color={'gray'}/>
                <p key={id}>{username}</p>
                <button className='add-btn' onClick={()=>addRoom({id,userID})}>
                <BsFillPersonPlusFill/>
                </button>
                  </div>
                    }
                    <hr style={{color:'gray',opacity:0.2}} />
                </div>
                )
              } )
            }</div>
        </div>
    </div>
  )
}
