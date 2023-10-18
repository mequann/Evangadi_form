import React, { useState } from 'react'
import"./Answer.css"
import axios from 'axios'

function Answer() {
    const[answer,setAnswer]=useState('')
    //post answer
    const postAnswer=async()=>{
        await axios.post('http://localhost:4000/api/answer/',{
            answer
        })
    }
  return (
    <div className='answer'>
    <form  >
      <textarea name="" id="qa" 
      cols="255" rows="10"
      value={answer}
      onChange={e=>setAnswer(e.target.value)}
      >

      </textarea>
      <button>post your answer</button>
    </form>
  </div>
  )
}

export default Answer