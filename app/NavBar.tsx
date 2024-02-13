// Navbar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><NavLink to="/" end>HOME</NavLink></li>
        <li><NavLink to="/check-score">CHECK SCORE</NavLink></li>
        <li><NavLink to="/about">ABOUT</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
