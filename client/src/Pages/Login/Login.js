import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import {useDataContext } from '../../Context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {const [userData,setUserData]= useDataContext();
  const navigte=useNavigate()
  const [form,setForm]=useState({})
  const handlechange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})

  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      //sending user data to database  to be logged in
      const loginRes=await axios.post('http://localhost:4000/api/users/login',{
        email:form.email,
        password:form.password
      })
      setUserData({
        token:loginRes.data.token,
        user:loginRes.data.user
      });
      localStorage.setItem('auth-token',loginRes.data.token)
      //navigate to  home page
      navigte('/')

    }
    catch(err)
    {console.log('problem', err.message)
    alert(err.response.data.msg)
  }

  }
  return (
    <div className='login'>
      {/* <h1>Login</h1> */}
   <div className='login__form'>
   <form onSubmit={handleSubmit}>
      {/* <label>Email</label> */}
      <input type='text' name='email' placeholder='Email'
      onChange={handlechange}
      /><br/>
{/* <label>Password</label> */}
      <input type='password' name='password'
      onChange={handlechange} placeholder='password'
      /><br/>
      <button>submit</button><br/>
    </form ><br/>
    <Link to='/signup'>create a new account</Link>
    </div>
    <div className="login__right">
      <h5>About</h5>
        <h2>Evangadi Network Q&A</h2>
        <p>
        No matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps.

Wheather you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.


        </p>
   </div>
        
     

    </div>
  )
}

export default Login