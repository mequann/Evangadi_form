import React, { useEffect, useState } from "react";
import "./Answer.css";
import axios from "axios";
import ProfileIcon from "@material-ui/icons/AccountCircle";
import { useNavigate } from 'react-router-dom';

function Answer() {
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState([]);
  const[test,setTest]=useState(false)
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
        document.getElementById("myForm").reset();
    // navigate('/answer')
      // Check if the response was successful.
       if (response.status === 200) {
        if(test){
          setTest(false)
        }
        else{
          setTest(true)
        }
        // Update the state variable with the new answer data.
        // setAnswer(await response.json());
      }

        
    }
     catch (error) {
        console.log(error.response.data.msg)
        
    }
    
  // Render the answer.
  // renderAnswer(answer);

}



//fetching the answers
useEffect(()=>{
  const fetchAnswer=async(e)=>{
    const qans= await fetch("http://localhost:4000/api/answer/qanswer")
    const tt=qans.json()
    .then((tt)=> {
      let filterdAnswer=tt.data
      console.log(filterdAnswer)
      return setAnswer(filterdAnswer?.filter(a=> a.question_id===x))
    }
    )
            // console.log(tt)
            // setAnswer(qans.data.data)
  }
          fetchAnswer();

},[test])
//rendering answers
const renderAnswer = (answer) => {
  if (!Array.isArray(answer)) {
    return "Write answer";
  } else {
    return answer.map((a, i) => {
      return (
          <div key={i}>
            <ProfileIcon className="avatar" />
            <div>{a.user_name}</div>
            <div>{a.answer}</div>
          </div>
        );
      
    });
  }
};
// const form=document.querySelector('form')
// form.reset()


// console.log(question)
  console.log(answer)
  return (
    <div className="answer">
      <div>
   <h2> {question[0]?.question}</h2>  
   <h5> {question[0]?.question_description}</h5>  
      </div>
      <div>{renderAnswer(answer)
    }</div>
     
      <div>
        <form onSubmit={handdlePost} id="myForm">
          <textarea
            name="answer"
            
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
