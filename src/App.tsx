import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import { Candidate } from './interfaces/Candidate.interface';

const App = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  return (
    <>
      <Nav />
      <main>
        <Outlet context={{ savedCandidates, setSavedCandidates }} />
      </main>
    </>
  );
};

export default App;
