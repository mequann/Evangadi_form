import React, {useEffect, useState } from 'react'
import './Home.css'
import {  useDataContext } from '../../Context/UserContext'
import { useNavigate } from 'react-router-dom';
// import LinkedInIcon from '@material-ui/icons/LinkedIn';
import LinkedInIcon from '@material-ui/icons/AccountCircle';
import axios  from 'axios';

const Home = ({logout}) => {
  const [userData,setUserData]= useDataContext();
  const [question, setQuestion] = useState([]);
  const navigate=useNavigate()
  useEffect(()=>{
    if(!userData.user) {
      navigate('/login')
    }
    //rendering  question
  const getQ=async()=>{
    try 
    {
     const question=await axios.get('http://localhost:4000/api/question/qbu')
     const rr=question.data
     
 // console.log(question)
 setQuestion(rr)
   
    } 
    catch (error) {
     console.log(error.message)
     
    }
   }
   getQ()
  },[userData.user, navigate])

  const ask=()=>{
    navigate('/ask')
  }
  //rendering  question
//   const getQ=async()=>{
//    try 
//    {
//     const question=await axios.get('http://localhost:4000/api/question/qbu')
    
// // console.log(question)
// setQuestion(question)
  
//    } 
//    catch (error) {
//     console.log(error.message)
    
//    }
//   }
   
  // getQ()
   console.log(question)
  
  return (
    <div className='home'>
      <div className='home__great'>
     
      <h1>Hello {userData.user?.display_name}</h1>
    <button onClick={logout}>logout</button>
      </div>
      <button onClick={ask}>Ask Question</button>
      <div  className='outer'>
      <LinkedInIcon className='avatar'/>
      <h1>{userData.user?.display_name}</h1>
      {question.map((item,id) => (
  <div key={id}>{item.question}</div>
))}
     
      
      </div>
    </div>
  )

}

export default Home