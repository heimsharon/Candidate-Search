import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import SavedCandidates from './pages/SavedCandidates';

const App = () => {
  const [ savedCandidates, setSavedCandidates ] = useState([]);
  return (
    <>
      <Nav />
      <main>
        <Outlet context={{ savedCandidates, setSavedCandidates }} />
      </main>
    </>
  );
}

export default App;
