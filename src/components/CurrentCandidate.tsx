// Summary:
// This file displays the current candidate's details fetched from the GitHub API and allows the user to skip to the next candidate.
import React, { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';

// Define Candidate object
interface Candidate {
  id: number; // Unique ID of the candidate
  login: string; // GitHub username
  avatar_url: string; // URL of the candidate's avatar image
  html_url: string; // URL to the candidate's GitHub profile
}

const CurrentCandidate: React.FC = () => {
  // State to store the current candidate
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  // Function to fetch the next candidate from the GitHub API
  const fetchNextCandidate = async () => {
    const data = await searchGithub(); // Call the API to fetch candidates
    if (data.length > 0) {
      setCandidate(data[0]); // Set the first candidate from the fetched data
    }
  };

  // Fetch the first candidate when the component mounts
  useEffect(() => {
    fetchNextCandidate();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Display a loading message while the candidate is being fetched
  if (!candidate) return <p>Loading candidate...</p>;

  // Render the current candidate's details
  return (
    <div>
      <h2>Current Candidate</h2>
      {/* Display the candidate's avatar */}
      <img src={candidate.avatar_url} alt={`${candidate.login}'s avatar`} width={100} />
      {/* Display the candidate's username */}
      <p>
        <strong>{candidate.login}</strong>
      </p>
      {/* Link to the candidate's GitHub profile */}
      <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
        View Profile
      </a>
      {/* Button to fetch the next candidate */}
      <button onClick={fetchNextCandidate}>Skip</button>
    </div>
  );
};

export default CurrentCandidate;