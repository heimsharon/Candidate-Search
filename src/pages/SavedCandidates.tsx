import React from 'react';
import '../Styles/index.css';

interface Candidate {
  name: string;
  username: string;
  location: string;
  avatar: string;
  email: string;
  html_url: string;
  company: string;
}

interface SavedCandidatesProps {
  savedCandidates: Candidate[];
}

const SavedCandidates: React.FC<SavedCandidatesProps> = ({ savedCandidates }) => {
  return (
    <>
      <h1>Potential Candidates</h1>
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
