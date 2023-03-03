import React, { useContext, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import AuthContext from '../context/Context';
import './signup.css'
import ClipLoader from 'react-spinners/ClipLoader'


export default function Signup() {
  let {signupUser,authTokens,loading} = useContext(AuthContext);
  const [name,setName] = useState('')
  const [password,setPassword] = useState('')

  let navigate = useNavigate();
  // 
  // if(authTokens){
  //   navigate('/chat')
  // }

  
  return (
    <div className='signup'>
      <div className="signup_left">
            <h1>ONE OF US?</h1>
            <p>Login to your account and stay connected with your Friends (if you have any)</p>
            <Link to={'/login'} className='sign_btn'>Login</Link>
          </div>
          <div className="signup_right">
        <form action="" onSubmit={name && password ? signupUser : (e)=>e.preventDefault()} >
            <input type="text" name="username" onChange={(e)=>setName(e.target.value)} placeholder='Username' id="username" />
            <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)} placeholder='Password' id="password" />
            {loading ? <div style={{display:'flex',justifyContent:'center'}}><ClipLoader color="#36d7b7" color="#00a884" size={25}/></div> : 
            <button type='submit' className='signup_btn'>Signup</button>
            }
        </form>
          </div>
          </div>
  )
}
