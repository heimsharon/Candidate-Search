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
    <div>
      <h2>Potential Candidates</h2>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.id}>
            <img src={candidate.avatar_url} alt={`${candidate.login}'s avatar`} width={50} />
            <p>
              <strong>{candidate.login}</strong>
            </p>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidatesList;