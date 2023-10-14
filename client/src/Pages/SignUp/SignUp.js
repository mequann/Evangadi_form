import React, {useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { useDataContext } from "../../Context/UserContext";
import axios from "axios";

const SignUp = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const [userData, setUserData] = useDataContext();
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value});
  };
  console.log(form)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //sending data to be register in the database
      await axios.post("http://localhost:4000/api/users/", form);
      //once register login automatically so send the  new user info login
      const loginRes = await axios.post("http://localhost:4000/api/users/login", {
        email: form.email,
        password: form.password,
      });
      //set the global state to new user
      setUserData({
        user: loginRes.data.user,
        token: loginRes.data.token,
      });
      //set the localstorage
      localStorage.setItem("auth-token", loginRes.data.token);
      navigate("/");
    } catch (err) {
      console.log( err.response.data.msg);
    }
  };
  //handleSubmit()
  return (
    <div className="signup">
      
      <div className="signup__form"><form onSubmit={handleSubmit}>
        {/* <>firstName</> */}
        <input type="text" name="firstName" onChange={handleChange} placeholder="firstName"/>

        <br />
        {/* <label>lastName</label> */}
        <input type="text" name="lastName" onChange={handleChange}  placeholder="lastName"/>
        <br />
        {/* <label>userName</label> */}
        <input type="text" name="userName" onChange={handleChange} placeholder="userName" />
        <br />
        {/* <label>Email</label> */}
        <input type="text" name="email" onChange={handleChange}  placeholder="Email"/>
        <br />
        {/* <label>password</label> */}
        <input type="password" name="password" onChange={handleChange} placeholder="password" />
        <br />
        <button >submit</button>
      </form>
      <Link to="/login"style={{textDecoration:"none",marginLeft:"30px",color:"lighred"}}>All Ready Hvave an accoount?</Link>
      </div>
      <div className='signup__right'>
      <h4> About</h4>
      <h1>Evangadi Network</h1>
      <p>No matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps.</p>
      <p>Wheather you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here. </p>
      <button>How it works</button>
    </div>
    </div>
  );
};

export default SignUp;
