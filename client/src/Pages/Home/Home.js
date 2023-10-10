import React, { useContext, useEffect } from 'react'
import './Home.css'
import { UserContext } from '../../Context/UserContext'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [userData,setUserData]=useContext(UserContext);
  const navigate=useNavigate()
  useEffect(()=>{
    if(!userData.user) {
      naviagte('/login')
    }

  },[userData.user, naviagte])
  return (
    <div><h1>Hello {userData.user?.display_name}</h1>
    <button onClick={logout}>logout</button>
    </div>
  )
}

export default Home