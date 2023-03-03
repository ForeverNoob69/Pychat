import React, { useContext } from 'react'
import './sidebar.css'
import Header_sidebar from './Header_sidebar'
import Sidebar_search from './Sidebar_search'
import SidebarChat from './SidebarChat'
import AuthContext from '../context/Context'

export default function Sidebar() {

  const {logoutUser} = useContext(AuthContext)

  return (
    <div className="sidebar">
            <Header_sidebar/>
            <Sidebar_search/>
            
            <SidebarChat/>
    </div>
  )
}
