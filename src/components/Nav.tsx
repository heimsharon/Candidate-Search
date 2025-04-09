import React from 'react';
import { Link } from 'react-router-dom';
import './styles/index.css';


const Nav : React.FC = () => {  
  
  return (
  <nav>
    <Link to='/CandidateSearch'>Candidate Search</Link>
    <Link to='/CandidateDetails'>Candidate Details</Link>
    <Link to='/CandidateSearchForm'>Candidate Search Form</Link>
    <Link to='/CandidateDetailsForm'>Candidate Details Form</Link>
    <Link to='/SavedCandidates'>Saved Candidates</Link>      
  </nav>
  
  
  )
};

export default Nav;
