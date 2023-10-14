import React, { useContext, useEffect } from 'react'
import './Home.css'
import {  useDataContext } from '../../Context/UserContext'
import { useNavigate } from 'react-router-dom';

const Home = ({logout}) => {
  const [userData,setUserData]= useDataContext();
  const navigate=useNavigate()
  useEffect(()=>{
    if(!userData.user) {
      navigate('/login')
    }

  },[userData.user, navigate])
  return (
    <div className='home'><h1>Hello {userData.user?.display_name}</h1>
    <button onClick={logout}>logout</button>
    </div>
  )
}

export default Home