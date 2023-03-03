import React, { useContext } from 'react'
import './sidebar.css'
import {BsFillChatLeftTextFill} from 'react-icons/bs';
import {FiMoreVertical} from 'react-icons/fi'
import {MdAccountCircle} from 'react-icons/md'
import {GoSignOut} from 'react-icons/go'
import AuthContext from '../context/Context';

export default function Header_sidebar() {


  const {logoutUser} = useContext(AuthContext)

  return (
    <div className="sidebar__header">
        
        <div className="sidebar_headerLeft">
            <MdAccountCircle className='avatar' color='white' size={'42'}/>
        </div>

        <div className="sidebar_headerRight">
        <button className='logout-btn' onClick={logoutUser}>
            <GoSignOut className='chat_icon' color='white' size={'22'} style={{marginRight:'18px'}}/>
        </button >
            <BsFillChatLeftTextFill className='chat_icon' color='white' size={'22'} style={{marginRight:'18px'}}/>
            <FiMoreVertical className='more_icon' color='white' size={'22'} style={{marginLeft:'12px'}}/>
        </div>
    </div>
  )
}
