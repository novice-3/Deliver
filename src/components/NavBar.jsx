// components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <style>
        {`
          body {
            background-color: #F8B195; /* Background color for the page */
          }
          .navbar {
            display: flex;
            justify-content: center;
            gap: 200px;
            padding: 10px;
            background-color: #F67280; /* Navbar background color */
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .navbar a {
            text-decoration: none;
            font-size: 18px;
            color: #fff; /* Link text color */
            transition: color 0.3s ease;
          }
          .navbar a:hover {
            color: #000000; /* Change link color on hover */
          }
        `}
      </style>
      <nav className="navbar">
        <Link to="/today">Today</Link>
        <Link to="/pending">Pending</Link>
        <Link to="/delivered">Delivered</Link>
        <Link to="/history">History</Link>
      </nav>
    </>
  );
}

export default Navbar;
