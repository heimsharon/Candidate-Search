// Summary:
// This file displays a list of saved candidates, allowing users to sort, paginate, and clear the list.
// It retrieves saved candidates from localStorage and provides sorting and pagination functionality.

import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Candidate } from '../interfaces/Candidate.interface';
import '../Styles/index.css';

// Custom hook to handle sorting logic
function useSortableData<T>(items: T[]) {
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(null);

  // Sort items based on the current sort configuration
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
  // Retrieve saved candidates and the function to update them from the Outlet context
  const { savedCandidates, setSavedCandidates } = useOutletContext<{
    savedCandidates: Candidate[];
    setSavedCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>;
  }>();

  // State to track the current page for pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const candidatesPerPage = 10; // Number of candidates displayed per page

  // Load saved candidates from localStorage when the component mounts
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  // Save updated candidates to localStorage whenever the savedCandidates state changes
  useEffect(() => {
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
  }, [savedCandidates]);

  // Use the custom sorting hook to manage sorting logic
  const { sortedItems: sortedCandidates, setSortConfig } = useSortableData(savedCandidates);
  const [sortConfig, setSortConfigState] = useState<{ key: keyof Candidate; direction: 'asc' | 'desc' } | null>(null);

  // Paginate the sorted candidates
  const paginatedCandidates = React.useMemo(() => {
    const startIndex = (currentPage - 1) * candidatesPerPage;
    return sortedCandidates.slice(startIndex, startIndex + candidatesPerPage);
  }, [sortedCandidates, currentPage]);

  // Handle navigation to the previous page
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Handle navigation to the next page
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(sortedCandidates.length / candidatesPerPage)));
  };

  // Handle clearing the saved candidates list
  const handleClearList = () => {
    const confirmClear = window.confirm('Are you sure you want to clear the saved candidates list?');
    if (confirmClear) {
      setSavedCandidates([]);
      localStorage.removeItem('savedCandidates'); // Clear from localStorage
    }
  };

  // Handle sorting by a specific column
  const handleSort = (key: keyof Candidate) => {
    setSortConfigState((prevConfig) => {
      if (prevConfig?.key === key) {
        return { key, direction: prevConfig.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
    setSortConfig((prevConfig) => {
      if (prevConfig?.key === key) {
        return { key, direction: prevConfig.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  // Get the sort arrow (▲ or ▼) for the current sort column
  const getSortArrow = (key: keyof Candidate) => {
    if (sortConfig?.key === key) {
      return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
    }
    return '';
  };

  return (
    <>
      {/* Header for the Saved Candidates page */}
      <header className="saved-candidates-header">
        <h1>Saved Candidates</h1>
        <p>List of saved candidates with sorting options.</p>
      </header>

      {/* Table displaying the saved candidates */}
      <table className="saved-candidates-table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
              Name{getSortArrow('name')}
            </th>
            <th onClick={() => handleSort('username')} style={{ cursor: 'pointer' }}>
              Username{getSortArrow('username')}
            </th>
            <th onClick={() => handleSort('location')} style={{ cursor: 'pointer' }}>
              Location{getSortArrow('location')}
            </th>
            <th>Email</th>
            <th onClick={() => handleSort('company')} style={{ cursor: 'pointer' }}>
              Company{getSortArrow('company')}
            </th>
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

      {/* Pagination controls */}
      <div className="pagination-controls">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(sortedCandidates.length / candidatesPerPage)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(sortedCandidates.length / candidatesPerPage)}
          aria-label="Go to next page"
        >
          Next
        </button>
      </div>

      {/* Clear list button */}
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
