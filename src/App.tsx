import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';


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
