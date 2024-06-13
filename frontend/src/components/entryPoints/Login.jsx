import React from 'react';
import './signup-login.css';

const Login = () => {
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password"  required/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
