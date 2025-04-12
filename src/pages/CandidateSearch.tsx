// This file is responsible for displaying the candidates and allowing the user to save or skip them.
import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Candidate } from '../interfaces/Candidate.interface';
import '../Styles/index.css';

const CandidateCard: React.FC<{ candidate: Candidate; onSave: () => void; onSkip: () => void }> = ({
  candidate,
  onSave,
  onSkip,
}) => (
  <div className="candidate-card">
    <div className="candidate-info">
      <img src={candidate.avatar} alt={`${candidate.name}'s avatar`} />
      <h2>{candidate.name}</h2>
      <p><strong>Username:</strong> {candidate.username}</p>
      <p><strong>Location:</strong> {candidate.location}</p>
      <p><strong>Email:</strong> {candidate.email}</p>
      <p><strong>Company:</strong> {candidate.company}</p>
      <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
        View Profile
      </a>
    </div>

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

const CandidateSearch: React.FC = () => {
  const { savedCandidates, setSavedCandidates } = useOutletContext<{
    savedCandidates: Candidate[];
    setSavedCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>;
  }>();

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSave = (candidate: Candidate) => {
    const updatedCandidates = [...savedCandidates, candidate];
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates)); // Save to localStorage
    setCurrentIndex(currentIndex + 1);
  };

  const handleSkip = () => {
    setCurrentIndex(currentIndex + 1);
  };

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch('https://api.github.com/users');
        const data = await response.json();

        const formattedData = data.map((user: any) => ({
          name: user.login,
          username: user.login,
          location: user.location || 'Unknown',
          avatar: user.avatar_url,
          email: user.email || 'Not available',
          html_url: user.html_url,
          company: user.company || 'Not available',
        }));

        setCandidates(formattedData);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates();
  }, []);

  if (currentIndex >= candidates.length) {
    return <h1 className="no-candidates-message">No more candidates available</h1>;
  }

  return (
    <div>
      <header className="candidate-search-header">
        <h1>Candidate Search</h1>
        <p>Review potential candidates and save or skip them.</p>
      </header>

      {candidates.length > 0 ? (
        <CandidateCard
          candidate={candidates[currentIndex]}
          onSave={() => handleSave(candidates[currentIndex])}
          onSkip={handleSkip}
        />
      ) : (
        <h1 className="loading-message">Loading candidates...</h1>
      )}
    </div>
  );
};

export default CandidateSearch;
