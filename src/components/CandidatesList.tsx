import React, { useEffect, useState } from 'react';
import { searchGithub } from '../api/API';

interface Candidate {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

const CandidatesList: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const data = await searchGithub();
        setCandidates(data);
      } catch (err) {
        setError('Failed to fetch candidates. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  if (loading) return <p>Loading candidates...</p>;
  if (error) return <p>{error}</p>;
  if (candidates.length === 0) return <p>No candidates available.</p>;

  return (
    <div className="candidates-list">
      <h2>Potential Candidates</h2>
      <div className="candidates-container">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="candidate-card">
            <img
              src={candidate.avatar_url}
              alt={`${candidate.login}'s avatar`}
              className="candidate-avatar"
            />
            <h3>{candidate.login}</h3>
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