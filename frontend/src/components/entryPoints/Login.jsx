import React,{useState} from 'react';
import { Link } from 'react-router-dom'; // Assuming you use React Router for navigation
import './signup-login.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate=useNavigate()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const handleSubmit=async (e)=>{
    e.preventDefault()

    let formData=new FormData()
    formData.append("email",email)
    formData.append("password",password)
    
    let {data} = await axios.post(
      "http://localhost:5000/api/v1/user/login",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("token",data.token)
    navigate("/chats",{replace:true})
  }
  return (
    <div className="login-comp">
      <div className="login-container">
        <h1>Login</h1>
        <form  onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" onChange={(e)=>setEmail(e.target.value)} value={email} required />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" onChange={(e)=>setPassword(e.target.value)} value={password} required />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
}

export default Login;
