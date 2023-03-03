import React, { useContext, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import AuthContext from '../context/Context';
import ClipLoader from 'react-spinners/ClipLoader'
import './login.css'



export default function Login() {
  let {loginUser,userName,authTokens,loading,setLoading} = useContext(AuthContext);
  const [name,setName] = useState('')
  const [password,setPassword] = useState('')

  let navigate = useNavigate();
  // setLoading(false)
  

  if(userName){
        navigate('/chat');
  }
  
  return (
    <div className='login'>
      <div className="login_left">
        <form action="" onSubmit={name && password ? loginUser: (e)=> e.preventDefault()} className='login_form' >
      <h1>Login to Your Account</h1>
            <input type="text" name="username" onChange={(e)=>setName(e.target.value)} placeholder='Username' id="username" />
            <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)} placeholder='Password' id="password" />
            {loading ? <ClipLoader color="#00a884" size={18}/> : 
            <button type='submit' className='login_btn'>Login</button>
            }
        </form>
      </div>
      <div className="login_right">
        <h1>New Here?</h1>
        <p>Sign up and find your Friends</p>
          <Link className='sign_btn' to={'/signup'}>Signup</Link>
      </div>
    </div>
  )
}
