import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Candidate } from '../interfaces/Candidate.interface';
import '../Styles/index.css';

const SavedCandidates: React.FC = () => {
  const { savedCandidates, setSavedCandidates } = useOutletContext<{
    savedCandidates: Candidate[];
    setSavedCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>;
  }>();

  const [sortConfig, setSortConfig] = useState<{ key: keyof Candidate; direction: 'asc' | 'desc' } | null>(null);

  const sortedCandidates = React.useMemo(() => {
    if (!sortConfig) return savedCandidates;

    const sorted = [...savedCandidates].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [savedCandidates, sortConfig]);

  const handleSort = (key: keyof Candidate) => {
    setSortConfig((prevConfig) => {
      if (prevConfig?.key === key) {
        return { key, direction: prevConfig.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const getSortArrow = (key: keyof Candidate) => {
    if (sortConfig?.key === key) {
      return sortConfig.direction === 'asc' ? '↑' : '↓';
    }
    return '';
  };

  const handleReject = (index: number) => {
    const updatedCandidates = savedCandidates.filter((_, i) => i !== index);
    setSavedCandidates(updatedCandidates);
  };

  return (
    <>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <table className="saved-candidates-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('avatar')}>Image {getSortArrow('avatar')}</th>
              <th onClick={() => handleSort('name')}>Name {getSortArrow('name')}</th>
              <th onClick={() => handleSort('username')}>Username {getSortArrow('username')}</th>
              <th onClick={() => handleSort('location')}>Location {getSortArrow('location')}</th>
              <th onClick={() => handleSort('email')}>Email {getSortArrow('email')}</th>
              <th onClick={() => handleSort('company')}>Company {getSortArrow('company')}</th>
              <th>Bio</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {sortedCandidates.map((candidate, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={candidate.avatar}
                    alt={`${candidate.name}'s avatar`}
                    className="candidate-avatar"
                  />
                </td>
                <td>{candidate.name}</td>
                <td>{candidate.username}</td>
                <td>{candidate.location}</td>
                <td>{candidate.email}</td>
                <td>{candidate.company}</td>
                <td>
                  <a
                    href={candidate.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Profile
                  </a>
                </td>
                <td>
                  <button
                    className="reject-button"
                    onClick={() => handleReject(index)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>No saved candidates yet.</h2>
      )}
    </>
  );
};

export default SavedCandidates;
