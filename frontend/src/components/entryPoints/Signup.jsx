import React, { useState } from 'react';
import './signup-login.css';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ChatState } from '../../contexts/ChatContext';

const Signup = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { setUser } = ChatState();
  
  const [user, setRegisterUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    picture: null,
  });
  
  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === 'picture') {
      if (files[0].type !== 'image/jpeg' && files[0].type !== 'image/png') {
        toast({
          title: 'Invalid file type',
          description: 'Please select a valid image file (PNG or JPG).',
          status: 'warning',
          duration: 4000,
          isClosable: true,
          position: 'top',
        });
        event.target.value = null;
        return;
      }
    }

    setRegisterUser((prevUser) => ({ ...prevUser, [name]: name === 'picture' ? files[0] : value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user.name || !user.email || !user.password || !user.confirmPassword || !user.picture) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in all fields.',
        status: 'warning',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    if (user.password !== user.confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'Passwords do not match.',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('confirmPassword', user.confirmPassword);
    formData.append('photo', user.picture);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/user/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if(data.status === "failed") {
        toast({
          title: 'Registration Failed',
          description: data.message,
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'top',
        });
        return;
      }
  
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      toast({
        title: 'Registration Successful',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      navigate("/chats", { replace: true });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to register. Please try again.';
      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <div className='signup-comp'>
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={user.name} onChange={handleChange} pattern=".{4,}" title="Name must be at least 4 characters long" />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={user.email} onChange={handleChange} />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={user.password} onChange={handleChange} pattern=".{8,}" title="Password must be at least 8 characters long" required/>

          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} pattern=".{8,}" title="Password must be at least 8 characters long" required/>

          <label htmlFor="profilePicture">Profile Picture:</label>
          <input type="file" id="profilePicture" name="picture" accept="image/*" onChange={handleChange} required/>

          <button type="submit">Sign Up</button>
        </form>
        <div className="login-redirect">
          <span>Already have an account? <Link to="/login"><b>Login</b></Link></span>
        </div>
      </div>
    </div>
  );
};

export default Signup;