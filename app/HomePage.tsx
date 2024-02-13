import React from 'react';
import Navbar from './NavBar'; 
import './HomePage.css';
const HomePage: React.FC = () => {
  return (
    
    <div className="home-container">
<Navbar />
      <div className="hero-section">
        <img src="app/image.png" alt="Authenticaster Graphic" />
      </div>
      <div className="content">
        <p>Authenticaster is a service that tells you your reliability score in the farcaster ecosystem.</p>
      </div>
    </div>
  );
};

export default HomePage;
