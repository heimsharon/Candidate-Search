import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Candidate } from '../interfaces/Candidate.interface';
import '../Styles/index.css';

const SavedCandidates: React.FC = () => {
  const { savedCandidates } = useOutletContext<{ savedCandidates: Candidate[] }>();

  return (
    <>
      <h1>Saved Candidates</h1>
      <div className="saved-candidates-list">
        {savedCandidates.length > 0 ? (
          savedCandidates.map((candidate, index) => (
            <div key={index} className="candidate-card">
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
            </div>
          ))
        ) : (
          <h2>No saved candidates yet.</h2>
        )}
      </div>
    </>
  );
};

export default SavedCandidates;
