import React, { useEffect, useState } from "react";
import "./Answer.css";
import axios from "axios";
import ProfileIcon from "@material-ui/icons/AccountCircle";
import { useNavigate } from 'react-router-dom';

function Answer() {
  const [answer, setAnswer] = useState([]);
  const [question, setQuestion] = useState([]);
  const navigate=useNavigate()
  var x = parseInt(localStorage.getItem("id"));
  
  useEffect(() => {
    const getQ =  async() => {
      try {
        const question = await axios.get("http://localhost:4000/api/question/qbu");
        // console.log(question)
        let filteredq=question?.data?.data
        // console.log(filteredq)
        // let filtered=filteredq?.filter((q)=> question.question_id === x)
        setQuestion(filteredq?.filter((q)=> q.question_id === x))

        // const rr =  question.then(res => res.json());
        // rr.then(question => {
        //   let questions = question.data
        //   console.log(questions)
        //   let y = questions.filter(question =>  question.question_id === x)
        //   console.log(y)
        //   setQuestion(y)

        // }
        //   )
      //  const filteredq= rr.then(question => question.filter((q)=> x===q.question_id ))
        // console.log(filteredq)
        // setQuestion(filteredq);
      } catch (error) {
         console.log(error.message)
      }
    };
    getQ();
  }, []);
  // console.log(question)
  
  //post answer
  const handdlePost=async(e)=>{
    e.preventDefault()
   try {
      let y=parseInt(localStorage.getItem('user-id'))
    const response= await axios.post("http://localhost:4000/api/answer/",{
        answer,
        userId:y,
        questionId:x
        })
        // console.log(response.data.msg)
        
    navigate('/answer')

        
    }
     catch (error) {
        console.log(error.response.data.msg)
        
    }

}
//fetching the answers
useEffect(()=>{
  const renderAnswer=async(e)=>{
    const qans= await fetch("http://localhost:4000/api/answer/qanswer")
    const tt=qans.json()
    .then((tt)=> setAnswer(tt.data))
            // console.log(tt)
            // setAnswer(qans.data.data)
  }
          renderAnswer();

},[])
//rendering answers
const renderAnswer=(answerr)=>{
  if(!Array.isArray(answerr)){
    return "write your answer"
  }
  else{
    answerr.map((a,i)=>{
        
      if(x!==a.question_id ||!a) {
       
           return ""
      }
      else{
        return(
          <> 
         <div key={i}> {<ProfileIcon className="avatar" />}
         <div>{a.user_name}</div>
           {a.answer}
           
           </div>
          
           </>

         )
      }

    })

  }
}
// console.log(question)
  console.log(answer)
  return (
    <div className="answer">
      <div>
   <h2> {question[0]?.question}</h2>  
   <h5> {question[0]?.question_description}</h5>  
      </div>
      {
     
     renderAnswer(answer)
    }
     
      <div>
        <form onSubmit={handdlePost}>
          <textarea
            name="answer"
            id="qa"
            cols="255"
            rows="10"
            // value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          ></textarea>
          <button >post your answer</button>
        </form>
      </div>
    </div>
  );
}

export default Answer;
