import React, {useEffect, useState } from 'react'
import './Home.css'
import {  useDataContext } from '../../Context/UserContext'
import { useNavigate } from 'react-router-dom';
// import LinkedInIcon from '@material-ui/icons/LinkedIn';
import LinkedInIcon from '@material-ui/icons/AccountCircle';
import axios  from 'axios';

const Home = ({logout}) => {
  const [userData,setUserData]= useDataContext();
  const navigate=useNavigate()
  useEffect(()=>{
    if(!userData.user) {
      navigate('/login')
    }

  },[userData.user, navigate])
  const ask=()=>{
    navigate('/ask')
  }
  //rendering  question
  const getQ=async()=>{
    const question=await axios.get('http://llocalhost:4000/api/question/')
    question.filter(q=>{

    })
  }
  return (
    <div className='home'>
      <div className='home__great'>
     
      <h1>Hello {userData.user?.display_name}</h1>
    <button onClick={logout}>logout</button>
      </div>
      <button onClick={ask}>Ask Question</button>
      <div  className='outer'>
      <LinkedInIcon className='avatar'/>
      </div>
    </div>
  )
}

export default Home