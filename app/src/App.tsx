import './App.css';
import Header from './components/ui/Header';
import levels from './assets/levels.json';
import Game from './components/Game';

function App() {
  return (
    <div className='App flex flex-col items-center justify-center'>
      <Header />
      <Game waldos={levels} player="leo"/>
    </div>
  );
}

export default App;
