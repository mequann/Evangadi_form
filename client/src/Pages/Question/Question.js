import React, { useEffect, useState } from 'react'
import axios from 'axios'
import"./Question.css"
import { useNavigate } from 'react-router-dom'
import { useDataContext } from '../../Context/UserContext'

function Question() {
    const[question,setQuestion]=useState("")
    const [qdescription,setQdescription]=useState('')
    const [userData, setUserData] = useDataContext();
    // const [form, setForm] = useState({});
    const navigate=useNavigate()
    useEffect(()=>{ 
        // if(!question||!qdescription) {

        //     navigate("/home")
        // }
        

    },[question])
    
    //handdle submit
    const handdlePost=async(e)=>{
        e.preventDefault()
        let y=localStorage.getItem('user-id')
        try {
        let response =    await axios.post("http://localhost:4000/api/question/",{
            question,
            qdescription,
            userId:y
        })
  console.log(response)
        // localStorage.setItem("user-id")
        navigate('/')

            
        }
         catch (error) {
            console.log(error.response.data.msg)
            console.log(error.message)
            
        }

    }

    return (
      <div className='ask'>
          <div className='ask__question'>
              <form onSubmit={handdlePost}>
        <input type="text" name='question'  placeholder='write your question here'
        value={question} onChange={e=>setQuestion(e.target.value)}/>
        <textarea name="qdiscription" id="qd"
        value={qdescription}
        onChange={e=>setQdescription(e.target.value)}
         cols="250" rows="10">
    
        </textarea>
        <button>click here to post your question</button>
      </form>
      </div>
      </div>
    )
  
}

export default Question