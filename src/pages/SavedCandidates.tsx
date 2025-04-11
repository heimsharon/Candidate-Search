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

  const [sortConfig, setSortConfig] = React.useState<{ key: keyof Candidate; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const candidatesPerPage = 10;

  const sortedCandidates = React.useMemo(() => {
    if (!sortConfig) return savedCandidates;
    return [...savedCandidates].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [savedCandidates, sortConfig]);

  const paginatedCandidates = React.useMemo(() => {
    const startIndex = (currentPage - 1) * candidatesPerPage;
    return sortedCandidates.slice(startIndex, startIndex + candidatesPerPage);
  }, [sortedCandidates, currentPage]);

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

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(savedCandidates.length / candidatesPerPage)));
  };

  return (
    <><header className="potential-candidate-list-header">
    <h1>Potential Candidate</h1>
    <p>Review potential candidates, with the ability to sort by category .</p>
  </header>
      <table className="saved-candidates-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('avatar')}>Avatar {getSortArrow('avatar')}</th>
            <th onClick={() => handleSort('name')}>Name {getSortArrow('name')}</th>
            <th onClick={() => handleSort('username')}>Username {getSortArrow('username')}</th>
            <th onClick={() => handleSort('location')}>Location {getSortArrow('location')}</th>
            <th onClick={() => handleSort('email')}>Email {getSortArrow('email')}</th>
            <th onClick={() => handleSort('company')}>Company {getSortArrow('company')}</th>
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
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(savedCandidates.length / candidatesPerPage)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(savedCandidates.length / candidatesPerPage)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default SavedCandidates;
