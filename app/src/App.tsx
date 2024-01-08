import { Route, Routes } from 'react-router-dom';
import './App.css';
import GameScreen from './components/GameScreen';
import Home from './components/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:roomNumber" element={<GameScreen />} />
    </Routes>
  );
}

export default App;
