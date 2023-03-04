import React from 'react'

import './App.css';
import Sidebar from './sidebar/Sidebar';
import Chat from './chat/Chat';
import Login from './login/Login';
import { AuthProvider } from './context/Context';

import PrivateRoute from './privateRout/PrivateRoute';


import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Signup from './login/Signup';
import Home from './Home';


function App() {

  // const endpointMessage = 'http://127.0.0.1:8000/message'

  // const [messages,setMessages] = useState([])

  // let {authTokens} = useContext(AuthContext);
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
  //           'Authorization':'Bearer '+String(authTokens?.access)
  //         }
  //       });
    
  //       const data = await response.json();
  //       setMessages(data)
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
  

  const router = createBrowserRouter([{
    path:'/login',
    element:<AuthProvider><Login/></AuthProvider>
  },{
    path:'/',
    element:<AuthProvider><Home/></AuthProvider>,
  },{
    path:'/signup',
    element:<AuthProvider><Signup/></AuthProvider>
  },{
    path: '/',
    element: (
      <AuthProvider>
        <PrivateRoute>
          <div className="App">
            <div className="app__body">
              <Sidebar />
              <Outlet />
            </div>
          </div>
        </PrivateRoute>
      </AuthProvider>
    ),
    children: [
      {
        path: 'chat',
        element: <>  <div className="App">
        <div className="app__body"><Sidebar/><Chat /></div>
          </div></>
      },
      {
        path: 'chat/rooms/:roomID',
        element: <><div className="App">
        <div className="app__body"><Sidebar/><Chat /></div>
        </div></>
      }
    ]
  }
]);
  return (
    // <div className="App">
    // [
    //   {
    //     path: 'chat',
    //     element: <AuthProvider>
    //     <PrivateRoute>
    //       <div className="App">
    //         <div className="app__body"><Sidebar/><Chat /></div></div></PrivateRoute></AuthProvider>
    //   },
    //   {
    //     path: 'chat/rooms/:roomID',
    //     element: <AuthProvider>
    //     <PrivateRoute>
    //       <div className="App">
    //         <div className="app__body"><Sidebar/><Chat /></div></div></PrivateRoute></AuthProvider>
    //   }
    // ]
    //   <header className="App-header">
    //     <div className="app__body">
          
          <RouterProvider router={router}/>
    //     </div>
    //   </header>
    // </div>
  );
}

export default App;
