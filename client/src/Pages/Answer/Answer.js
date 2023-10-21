import React, { useEffect, useState } from "react";
import "./Answer.css";
import axios from "axios";
import ProfileIcon from "@material-ui/icons/AccountCircle";

function Answer() {
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState([]);
  //post answer
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
      //  const rr = question.json();
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
  console.log(question)
  
  //post answer
  const postAnswer = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/api/answer/", {
      answer,
    });
    const qans= await axios.get("http://localhost:4000/api/answer/")

  };


  return (
    <div className="answer">
      <div>
   <h2> {question[0]?.question}</h2>  
   <h5> {question[0]?.question_description}</h5>  
      </div>
      <>{<ProfileIcon className="avatar" />}</>

      <div>
        <form >
          <textarea
            name=""
            id="qa"
            cols="255"
            rows="10"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          ></textarea>
          <button onSubmit={postAnswer}>post your answer</button>
        </form>
      </div>
    </div>
  );
}

export default Answer;
