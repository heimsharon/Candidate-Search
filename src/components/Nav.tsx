import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/index.css';

const Nav: React.FC = () => {
  return (
    <nav className="nav">
      <Link className="nav-link" to="/">Candidate Search</Link>
      <Link className="nav-link" to="/saved">Potential Candidates</Link>
    </nav>
  );
};

export default Nav;
