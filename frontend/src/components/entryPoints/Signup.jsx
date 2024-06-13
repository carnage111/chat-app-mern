import React from 'react';
import './signup-login.css';

const Signup = () => {
  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" required/>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" required/>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" required/>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" required/>
        <label htmlFor="profilePicture">Profile Picture:</label>
        <input type="file" id="profilePicture" accept="image/*" required/>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
  
export default Signup;
