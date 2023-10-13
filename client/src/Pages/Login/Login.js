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
    <div><h1>Login</h1>
    <form onSubmit={handleSubmit}>
      <label>Email</label>
      <input type='text' name='email'
      onChange={handlechange}
      /><br/>
<label>Password</label>
      <input type='password' name='password'
      onChange={handlechange}
      /><br/>
      <button>submit</button>
    </form >
    <Link to='/signup'>create a new account</Link>

    </div>
  )
}

export default Login