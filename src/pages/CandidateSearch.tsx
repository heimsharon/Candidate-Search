// Summary:
// This file is responsible for displaying a list of candidates fetched from the GitHub API.
// Users can review each candidate's details and either save or skip them.
// Saved candidates are stored in localStorage and managed via the Outlet context.
// The page also handles loading and error states during the API call.

import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Candidate } from '../interfaces/Candidate.interface';
import '../Styles/index.css';

// CandidateCard Component:
// This component displays the details of a single candidate, including their avatar, name, username, location, email, and company.
// It also provides "Save" and "Skip" buttons for user interaction.
const CandidateCard: React.FC<{ candidate: Candidate; onSave: () => void; onSkip: () => void }> = ({
  candidate,
  onSave,
  onSkip,
}) => (
  <div className="candidate-card">
    <div className="candidate-info">
      {/* Display the candidate's avatar */}
      <img src={candidate.avatar} alt={`${candidate.name}'s avatar`} />
      {/* Display the candidate's name */}
      <h2>{candidate.name}</h2>
      {/* Display additional candidate details */}
      <p><strong>Username:</strong> {candidate.username}</p>
      <p><strong>Location:</strong> {candidate.location}</p>
      <p><strong>Email:</strong> {candidate.email}</p>
      <p><strong>Company:</strong> {candidate.company}</p>
      {/* Link to the candidate's GitHub profile */}
      <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
        View Profile
      </a>
    </div>

    {/* Save and Skip buttons */}
    <div className="candidate-actions">
      <button
        className="save-button"
        onClick={onSave}
        aria-label={`Save candidate ${candidate.name}`}
      >
        Save
      </button>
      <button
        className="skip-button"
        onClick={onSkip}
        aria-label={`Skip candidate ${candidate.name}`}
      >
        Skip
      </button>
    </div>
  </div>
);

// CandidateSearch Component:
// This component manages the list of candidates and handles user interactions (save/skip).
const CandidateSearch: React.FC = () => {
  // Access saved candidates and the function to update them from the Outlet context
  const { savedCandidates, setSavedCandidates } = useOutletContext<{
    savedCandidates: Candidate[];
    setSavedCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>;
  }>();

  // State to store the list of candidates fetched from the API
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  // State to track the index of the current candidate being displayed
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle saving a candidate
  const handleSave = (candidate: Candidate) => {
    const updatedCandidates = [...savedCandidates, candidate]; // Add the candidate to the saved list
    setSavedCandidates(updatedCandidates); // Update the saved candidates state
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates)); // Persist the saved candidates in localStorage
    setCurrentIndex(currentIndex + 1); // Move to the next candidate
  };

  // Function to handle skipping a candidate
  const handleSkip = () => {
    setCurrentIndex(currentIndex + 1); // Move to the next candidate
  };

  // Fetch candidates from the GitHub API when the component mounts
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch('https://api.github.com/users'); // Fetch data from the GitHub API
        const data = await response.json();

        // Format the fetched data to match the Candidate interface
        const formattedData = data.map((user: any) => ({
          name: user.login,
          username: user.login,
          location: user.location || 'Unknown',
          avatar: user.avatar_url,
          email: user.email || 'Not available',
          html_url: user.html_url,
          company: user.company || 'Not available',
        }));

        setCandidates(formattedData); // Update the candidates state with the formatted data
      } catch (error) {
        console.error('Error fetching candidates:', error); // Log any errors during the API call
      }
    };

    fetchCandidates(); // Trigger the API call
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Display a message if there are no more candidates to review
  if (currentIndex >= candidates.length) {
    return <h1 className="no-candidates-message">No more candidates available</h1>;
  }

  return (
    <div>
      {/* Header for the Candidate Search page */}
      <header className="candidate-search-header">
        <h1>Candidate Search</h1>
        <p>Review potential candidates and save or skip them.</p>
      </header>

      {/* Display the current candidate or a loading message */}
      {candidates.length > 0 ? (
        <CandidateCard
          candidate={candidates[currentIndex]} // Pass the current candidate to the CandidateCard component
          onSave={() => handleSave(candidates[currentIndex])} // Pass the save handler
          onSkip={handleSkip} // Pass the skip handler
        />
      ) : (
        <h1 className="loading-message">Loading candidates...</h1>
      )}
    </div>
  );
};

export default CandidateSearch;
