import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/ui/Header';
import WaldoImage from './components/WaldoImage';
import waldoData from './assets/waldos.json';

function App() {
  const waldos = waldoData;
  const [foundWaldo, setFoundWaldo] = useState(false);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    if (foundWaldo) {
      setLevel(level + 1);
      setFoundWaldo(false);
    }
  }, [foundWaldo, level]);

  return (
    <div className='App flex flex-col items-center justify-center'>
      <Header />
      <p className='font-mono'>Where is waldo?</p>
      <WaldoImage waldo={waldos[level]} setFoundWaldo={setFoundWaldo} />
    </div>
  );
}

export default App;
