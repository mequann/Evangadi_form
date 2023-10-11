
import React,{ useContext, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import { UserContext } from './Context/UserContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home';
import SignUp from './Pages/SignUp/SignUp';
import Login from './Pages/Login/Login';

 


function App() {
  const[userData,setUserData]=useContext(UserContext)
  const checkLoggedIn=async()=>{
    let token=localStorage.getItem('auth-token')
    if(token==null) {
      localStorage.setItem('auth-token','')
      token='';
    }
    else{
      //if token exists in localstorage then use auth to verify token and get user info
      const userRes=await axios.get('http://localhost:4000/api/users',{
        headers:{'x-auth-token':token}
      })
      setUserData({
        token,
        user:{
    id:userRes.data.dta.user_id,
    display_name:userRes.data.data.user_name
        }
      })
    }
  }
  const logout=()=>{
    setUserData({
      token:undefined,
      user:undefined
    });
    //resetting localstorage
    localStorage.setItem('x-uth-token','')
  }
  //set the global state with user info
  
useEffect(()=>{checkLoggedIn()},[])
  return (
      <Router>
    <div className="App">
        <Routes>
          <Route path='/' element={<Home logout={logout}/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
        </Routes>
    </div>
      </Router>
      
  );
}

export default App;
