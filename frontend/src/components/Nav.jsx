import React from 'react';
import { NavLink } from "react-router-dom"; 


const NavBar = () => {
  return (
    <nav id='navbar-comp'>
      <ul className="pro-nav">
        <li><NavLink className="nav-link" to="/" ><img src="/logo6-rmg.png" alt="logo"/></NavLink></li>
        <li><NavLink className="nav-link" to="/signup">SignUp</NavLink></li>
        <li><NavLink className="nav-link" to="/login">Login</NavLink></li>
      </ul>
    </nav>
  );
}

export default NavBar;
