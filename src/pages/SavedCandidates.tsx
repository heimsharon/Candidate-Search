// This file is where the saved candidates are displayed and managed.
import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Candidate } from '../interfaces/Candidate.interface';
import '../Styles/index.css';

function useSortableData<T>(items: T[]) {
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(null);

  const sortedItems = React.useMemo(() => {
    if (!sortConfig) return items;

    return [...items].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [items, sortConfig]);

  return { sortedItems, setSortConfig };
}

const SavedCandidates: React.FC = () => {
  const { savedCandidates, setSavedCandidates } = useOutletContext<{
    savedCandidates: Candidate[];
    setSavedCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>;
  }>();

  const [currentPage, setCurrentPage] = React.useState(1);
  const candidatesPerPage = 10;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
  }, [savedCandidates]);

  const paginatedCandidates = React.useMemo(() => {
    const startIndex = (currentPage - 1) * candidatesPerPage;
    return savedCandidates.slice(startIndex, startIndex + candidatesPerPage);
  }, [savedCandidates, currentPage]);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(savedCandidates.length / candidatesPerPage)));
  };

  const handleClearList = () => {
    const confirmClear = window.confirm('Are you sure you want to clear the saved candidates list?');
    if (confirmClear) {
      setSavedCandidates([]);
      localStorage.removeItem('savedCandidates'); // Clear from localStorage
    }
  };

  // Use the custom hook for sorting
  const { sortedItems: sortedCandidates, setSortConfig } = useSortableData(savedCandidates);

  const handleSort = (key: keyof Candidate) => {
    setSortConfig((prevConfig) => {
      if (prevConfig?.key === key) {
        return { key, direction: prevConfig.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  return (
    <>
      <header className="saved-candidates-header">
        <h1>Potential Candidates</h1>
        <p>List of saved candidates with sorting options.</p>
      </header>
      <table className="saved-candidates-table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th onClick={() => handleSort('name')}>Name</th>
            <th>Username</th>
            <th onClick={() => handleSort('location')}>Location</th>
            <th>Email</th>
            <th onClick={() => handleSort('company')}>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCandidates.map((candidate) => (
            <tr key={candidate.username}>
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
                <button
                  className="reject-button"
                  onClick={() => {
                    const updatedCandidates = savedCandidates.filter(
                      (c) => c.username !== candidate.username
                    );
                    setSavedCandidates(updatedCandidates);
                  }}
                  aria-label={`Reject candidate ${candidate.name}`}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(savedCandidates.length / candidatesPerPage)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(savedCandidates.length / candidatesPerPage)}
          aria-label="Go to next page"
        >
          Next
        </button>
      </div>
      <div className="clear-list-container">
        <button
          className="clear-list-button"
          onClick={handleClearList}
          aria-label="Clear saved candidates list"
        >
          Clear List
        </button>
      </div>
    </>
  );
};

export default SavedCandidates;
