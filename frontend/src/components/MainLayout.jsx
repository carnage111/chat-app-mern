import React from 'react';
import Nav from './Nav'

const MainLayout = ({ children }) => {
  return (
    <div>
      <Nav />
      <div className="pro-container">
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
