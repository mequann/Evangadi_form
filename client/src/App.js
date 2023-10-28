
import React,{ useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import axios from 'axios'
import {useDataContext } from './Context/UserContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './Pages/Home/Home';
import SignUp from './Pages/SignUp/SignUp';
import Login from './Pages/Login/Login';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import Question from './Pages/Question/Question';
import Answer from './Pages/Answer/Answer';

function App() {
  const[userData,setUserData]= useDataContext()
  // const checkLoggedIn=async()=>{
  //   let token=localStorage.getItem('auth-token')
  //   if(token==null) {
  //     localStorage.setItem('auth-token','')
  //     token='';   
  //   }  
  //   else{
  //   try{
  //       //if token exists in localstorage then use auth to verify token and get user info
  //       const userRes=await axios.get('http://localhost:4000/api/users',{
  //         headers:{'x-auth-token':token}
  //       })
  //       setUserData({
  //         token,
  //         user:{
  //     id:userRes.data.data.user_id,
  //     display_name:userRes.data.data.user_name
  //         }
  //       })
  //   }
  //   catch (err) {
  //     console.log("problem", err.message);  
  //   }
  //   }
  // }
  const logout=()=>{
    setUserData({
      token:undefined,
      user:undefined
    });
    //resetting localstorage
    localStorage.setItem('x-uth-token','')
  }
  //set the global state with user info
  
// useEffect(()=>{checkLoggedIn()},[])
  return (
  
      <Router>
    <div className="App">
     <Navbar/>
        <Routes>
          <Route path='/' element={<Home logout={logout}/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/ask' element={<Question />}/>
          <Route path='/answer' element={<Answer />}/>
        </Routes>
    </div>
    <Footer/>
      </Router>
      
  );
}

export default App;
