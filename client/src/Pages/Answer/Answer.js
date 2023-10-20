import React, { useEffect, useState } from "react";
import "./Answer.css";
import axios from "axios";
import ProfileIcon from "@material-ui/icons/AccountCircle";

function Answer() {
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState([]);
  //post answer
  useEffect(() => {
    const getQ = async () => {
      try {
        const question = await fetch("http://localhost:4000/api/question/qbu");
        const rr = await question.json();

        //  console.log(question)
        setQuestion(rr.data);
      } catch (error) {
        //  console.log(error.message)
      }
    };
    getQ();
  }, []);
  //post answer
  const postAnswer = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/api/answer/", {
      answer,
    });
  };
  var x = parseInt(localStorage.getItem("id"));

  return (
    <div className="answer">
      <div>
      {question.filter((q) => {
  if (x === q.question_id) {
    return <div key={q.question_id}><h2>{q.question}</h2></div>;
  }
  return null;
})}
      </div>
      <>{<ProfileIcon className="avatar" />}</>
      <div>
        <form onSubmit={postAnswer}>
          <textarea
            name=""
            id="qa"
            cols="255"
            rows="10"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          ></textarea>
          <button>post your answer</button>
        </form>
      </div>
    </div>
  );
}

export default Answer;
