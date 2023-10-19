import React, { useEffect, useState } from 'react'
import axios from 'axios'
import"./Question.css"
import { useNavigate } from 'react-router-dom'

function Question() {
    const[question,setQuestion]=useState("")
    const [qdescription,setQdescription]=useState('')
    // const [form, setForm] = useState({});
    const navigate=useNavigate()
    useEffect(()=>{ 
        // if(!question||!qdescription) {

        //     navigate("/home")
        // }
        

    },[question])
    // const handlechange = (e) => {
    //     setForm({ ...form, [e.target.name]: e.target.value });
    //   };
    //handdle submit
    const handdlePost=async(e)=>{
        e.preventDefault()
        try {
            await axios.post("http://localhost:4000/api/question/",{
            question,
            qdescription

            
        })
        navigate('/')

            
        }
         catch (error) {
            console.log(error.message)
            
        }

    }

    return (
      <div className='ask'>
          <div className='ask__question'>
              <form onClick={handdlePost}>
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