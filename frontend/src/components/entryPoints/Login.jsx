import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you use React Router for navigation
import './signup-login.css';

const Login = () => {
  return (
    <div className="login-comp">
      <div className="login-container">
        <h1>Login</h1>
        <form>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" required />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" required />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
}

export default Login;
