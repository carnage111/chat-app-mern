import React, { useState } from 'react';
import './signup-login.css';

const Signup = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    picture: null,
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: name === 'picture' ? files[0] : value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('User data:', user); 
  };

  return (
    <div className='signup-comp'>
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={user.name} onChange={handleChange} required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={user.email} onChange={handleChange} required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={user.password} onChange={handleChange} required />

          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} required />

          <label htmlFor="profilePicture">Profile Picture:</label>
          <input type="file" id="profilePicture" name="picture" accept="image/*" onChange={handleChange} />

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
