import React, { useState, useEffect } from 'react';
import { Candidate as CandidateType } from '../interfaces/Candidate.interface';
import '../styles/styles.css';

const CandidateSearch: React.FC = () => {
    const [candidates, setCandidates] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [savedCandidates, setSavedCandidates] = useState<CandidateType[]>([]);


    const handleSave = (candidate: CandidateType) => {
        setSavedCandidates([...savedCandidates, candidate]);
        setCurrentIndex(currentIndex + 1);
    };
    const handleSkip = () => {
        setCurrentIndex(currentIndex + 1);
    };

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await fetch('https://api.github.com/search/users');
                const data = await response.json();
                const formattedData = data.items.map((user: any) => ({
                    name: user.name || user.login,
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
          {candidates.length > 0 ? (
              <div className="candidate-card">
                  <div className="candidate-info">
                      <img src={candidates[currentIndex].avatar} alt={`${candidates[currentIndex].name}'s avatar`} />
                      <h2>{candidates[currentIndex].name}</h2>
                      <p><strong>Username:</strong> {candidates[currentIndex].username}</p>
                      <p><strong>Location:</strong> {candidates[currentIndex].location}</p>
                      <p><strong>Email:</strong> {candidates[currentIndex].email}</p>
                      <p><strong>Company:</strong> {candidates[currentIndex].company}</p>
                      <a href={candidates[currentIndex].html_url} target="_blank" rel="noopener noreferrer">
                          View Profile
                      </a>
                  </div>
                  <div className="candidate-actions">
                      <button onClick={() => handleSave(candidates[currentIndex])}>+</button>
                      <button onClick={handleSkip}>-</button>
                  </div>
              </div>
          ) : (
              <h1 className="loading-message">Loading candidates...</h1>
          )}
      </div>
  );
};
export default CandidateSearch;
