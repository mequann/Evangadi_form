import React, { useEffect, useState } from "react";
import "./Home.css";
import { useDataContext } from "../../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import ProfileIcon from "@material-ui/icons/AccountCircle";
import axios from "axios";

const Home = ({ logout }) => {
  const [userData, setUserData] = useDataContext();
  const [question, setQuestion] = useState([]);
  const [questionId, setQuestionId] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    // if(!userData.user) {
    //   navigate('/login')
    // }
    //rendering  question
    //   const getQ=async()=>{
    //     try
    //     {
    //      const question=await fetch('http://localhost:4000/api/question/qbu')
    //      const rr= await question.json()
    // //  console.log(question)
    //  setQuestion(rr.data)
    //     }
    //     catch (error) {
    //      console.log(error.message)
    //     }
    //    }
    //    getQ()
  }, [userData.user, navigate]);

  const ask = () => {
    navigate("/ask");
  };
  //rendering  question
  useEffect(() => {
    const getQ = async () => {
      try {
        const question = await axios.get(
          "http://localhost:4000/api/question/qbu"
        );

        // console.log(question)
        setQuestion(question.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getQ();
  }, []);
  //when the question is clicked
  //the question id is captured
  // the id must be updated for each question click
  //the id must be passed to answer page

  const gg = (id) => {
    localStorage.setItem("id", id);
    navigate("/answer");
  };
  console.log(question);

  return (
    <div className="home">
      <div className="home__great">
        <h1>Hello {userData.user?.display_name}</h1>
        <button onClick={logout}>logout</button>
      </div>
      <button onClick={ask}>Ask Question</button>
      <div className="outer">
        <h1>{userData.user?.display_name}</h1>
        <div>
          {" "}
          {question.map((q) => (
            <div key={q.id} className="home__display">
              {<ProfileIcon className="avatar" />}
              {/* <Link to='/answer' style={{textDecoration:"none", marginLeft:"35px"}}> {q.question }
          </Link> */}

              <p onClick={() => gg(q.question_id)}>{q.question}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
