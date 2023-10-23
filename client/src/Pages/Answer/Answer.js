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
  console.log(x)
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
        await axios.post("http://localhost:4000/api/answer/",{
        answer,
        })
        
    navigate('/answer')

        
    }
     catch (error) {
        console.log(error.message)
        
    }

}
//render the answers
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

// console.log(question)
  console.log(answer)


  return (
    <div className="answer">
      <div>
   <h2> {question[0]?.question}</h2>  
   <h5> {question[0]?.question_description}</h5>  
      </div>
      {answer.map((a,i)=>{
        
        if(x!==a.question_id ||!a) {
         
             return ""
        }
        else{
          return(
            <> 
           <div key={i}> {<ProfileIcon className="avatar" />}
             {a.answer}
             </div>
            
             </>
 
           )
        }

      })}
     
      <div>
        <form onClick={handdlePost}>
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
