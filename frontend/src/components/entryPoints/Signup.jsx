import React, { useState } from 'react';
import './signup-login.css';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    picture: null,
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target; // Destructure the event target, event.target will select the element that triggered the event, here it would be the input field,eg: <input type="password" id="confirmPassword" name="confirmPassword" value="123">

    if(name === 'picture'){ //if the name is picture, then check if the file selected is a jpg or png file
      if(files[0].type !== 'image/jpeg' && files[0].type !== 'image/png'){ //if the file selected is not a jpg or png file, then show a toast message and return
        toast.warn('Please select a valid image file (PNG or JPG).', {
          position: 'top-center',
          autoClose: 3999,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark',
          transition: Flip,
        })
        event.target.value = null; //reset the value of the input field to null so that the user can select a new file, if the file selected is not a jpg or png file
        return;
      }
    }

    setUser((prevUser) => ({ ...prevUser, [name]: name === 'picture' ? files[0] : value })); //if the name is name, email, password or confirmPassword, then set the value to the respective field, else set the picture to the file selected
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
          <input type="text" id="name" name="name" value={user.name} onChange={handleChange} required/>

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={user.email} onChange={handleChange} required/>

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={user.password} onChange={handleChange} required/>

          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} required/>

          <label htmlFor="profilePicture">Profile Picture:</label>
          <input type="file" id="profilePicture" name="picture" accept="image/*" onChange={handleChange} required/>

          <button type="submit">Sign Up</button>
        </form>
      </div>
      <ToastContainer limit={3}/>
    </div>
  );
};

export default Signup;
