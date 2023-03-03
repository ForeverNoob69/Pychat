import React, { useContext } from 'react'
import { useNavigate,Outlet, Navigate } from 'react-router-dom'
import AuthContext from '../context/Context'

export default function PrivateRoute() {

  const {authTokens} = useContext(AuthContext)
  let navigate = useNavigate();

  return (
    authTokens ? <Outlet/> : <Navigate to='/login'/>
  )
}
