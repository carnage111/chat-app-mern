import React from 'react';
import './navbar.css'
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <img src="/logo6-rmg.png" alt="Chattastrophe Logo" className="logo" />
        <h1>Welcome to Chattastrophe</h1>
        <p>The future of chatting is here. Connect, communicate, and share like never before.</p>
      </header>
      
      <section className="features">
        <h2>Exciting Features</h2>
        <ul>
          <li>Real-time Messaging with Zero Latency</li>
          <li>High-quality Video and Voice Calls</li>
          <li>AI-Powered Chatbots for Instant Assistance</li>
          <li>End-to-End Encryption for Secure Conversations</li>
          <li>Customizable Themes and Chat Backgrounds</li>
        </ul>
      </section>

      <section className="random-section">
        <h2>Stay Connected</h2>
        <p>Join groups and communities of like-minded individuals. Share your thoughts, ideas, and moments.</p>
      </section>

      <section className="random-section">
        <h2>Seamless Integration</h2>
        <p>Integrate Chattastrophe with your favorite apps and services for a more connected experience.</p>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Chattastrophe. All rights reserved.</p>
        <nav className="footer-nav">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#contact">Contact Us</a>
        </nav>
      </footer>
    </div>
  );
}

export default Home;
