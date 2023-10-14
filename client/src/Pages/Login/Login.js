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
    <div className='login__form'>
      <form onSubmit={handleSubmit}>
      {/* <label>Email</label> */}
      <input type='text' name='email' placeholder='Email'
      onChange={handlechange}
      /><br/>
{/* <label>Password</label> */}
      <input type='password' name='password' placeholder='password'
      onChange={handlechange}
      /><br/>
      <button>submit</button>
    </form >
    <Link to='/signup' style={{textDecoration:"none",marginLeft:"30px",color:"lighred"}}>create a new account</Link>
    </div>
    <div className='login__right'>
      <h4> About</h4>
      <h1>Evangadi Network</h1>
      <p>No matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps.</p>
      <p>Wheather you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here. </p>
      <button>How it works</button>
    </div>

    </div>
  )
}

export default Login