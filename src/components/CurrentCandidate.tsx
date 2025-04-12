import React, { useState } from 'react';
import { searchGithub } from '../api/API';

interface Candidate {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

const CurrentCandidate: React.FC = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  const fetchNextCandidate = async () => {
    const data = await searchGithub();
    if (data.length > 0) {
      setCandidate(data[0]); 
    }
  };

  useEffect(() => {
    fetchNextCandidate();
  }, []);

  if (!candidate) return <p>Loading candidate...</p>;

  return (
    <div>
      <h2>Current Candidate</h2>
      <img src={candidate.avatar_url} alt={`${candidate.login}'s avatar`} width={100} />
      <p>
        <strong>{candidate.login}</strong>
      </p>
      <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
        View Profile
      </a>
      <button onClick={fetchNextCandidate}>Skip</button>
    </div>
  );
};

export default CurrentCandidate;