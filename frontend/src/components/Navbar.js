import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  return (
    <div className="navbar">
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
            <Link to="/blog">Task Tracker</Link>
          </li>
          {/* Add other links if needed */}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
