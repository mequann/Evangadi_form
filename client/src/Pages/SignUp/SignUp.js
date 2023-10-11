import React, { useContext, useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";

const SignUp = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const [userData, setUserData] = useContext(UserContext);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.targete.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //sending data to be registere in the database
      await axios.post("http://localhost:4000/api/user", form);
      //once register login automatically so send the  new user info login
      const loginRes = await axios.post("http://localhost:4000/api/user", {
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
      console.log("problem", err.response.data.msg);
    }
  };
  return (
    <div>
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit}>
        <>firstName</>
        <input type="text" name="firstName" onChange={handleChange} />

        <br />
        <label>lastName</label>
        <input type="text" name="lastName" onChange={handleChange} />
        <br />
        <label>userName</label>
        <input type="text" name="userName" onChange={handleChange} />
        <br />
        <label>Email</label>
        <input type="text" name="Email" onChange={handleChange} />
        <br />
        <label>password</label>
        <input type="password" name="password" onChange={handleChange} />
        <br />
        <button>submit</button>
      </form>
      <Link to="/login">All Ready Hvave an accoount?</Link>
    </div>
  );
};

export default SignUp;
