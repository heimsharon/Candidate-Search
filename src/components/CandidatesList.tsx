// Summary:
// This file displays a list of candidates fetched from the GitHub API, handling loading, error states, and rendering each candidate's details.

import React, { useEffect, useState } from 'react';
import { searchGithub } from '../api/API';

// Define the structure of a Candidate object
interface Candidate {
  id: number; // Unique ID of the candidate
  login: string; // GitHub username
  avatar_url: string; // URL of the candidate's avatar image
  html_url: string; // URL to the candidate's GitHub profile
}

const CandidatesList: React.FC = () => {
  // State to store the list of candidates
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  // State to manage the loading state
  const [loading, setLoading] = useState<boolean>(true);
  // State to handle errors during the API call
  const [error, setError] = useState<string | null>(null);

  // Fetch candidates from the GitHub API when the component mounts
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data
        const data = await searchGithub(); // Call the API to fetch candidates
        setCandidates(data); // Update the candidates state with the fetched data
      } catch (err) {
        // Handle errors during the API call
        setError('Failed to fetch candidates. Please try again.');
      } finally {
        setLoading(false); // Set loading to false after the API call completes
      }
    };

    fetchCandidates(); // Trigger the API call
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Display a loading message while data is being fetched
  if (loading) return <p>Loading candidates...</p>;

  // Display an error message if the API call fails
  if (error) return <p className="error-message">Failed to load candidates. Please try again.</p>;

  // Display a message if no candidates are available
  if (candidates.length === 0) return <p>No candidates currently available.</p>;

  // Render the list of candidates
  return (
    <div className="candidates-list">
      <h2>Potential Candidates</h2>
      <div className="candidates-container">
        {candidates.map((candidate) => (
          // Render each candidate as a card
          <div key={candidate.id} className="candidate-card">
            {/* Display the candidate's avatar */}
            <img
              src={candidate.avatar_url}
              alt={`${candidate.login}'s avatar`}
              className="candidate-avatar"
            />
            {/* Display the candidate's username */}
            <h3>{candidate.login}</h3>
            {/* Link to the candidate's GitHub profile */}
            <a
              href={candidate.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="view-profile-link"
            >
              View Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidatesList;