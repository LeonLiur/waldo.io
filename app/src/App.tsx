import './App.css';
import Header from './components/ui/Header';
import Game from './components/Game';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import GameScreen from './components/GameScreen';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:roomNumber" element={<GameScreen />} />
    </Routes>
  );
}

export default App;
