import './App.css';
import Header from './components/ui/Header';
import waldoData from './assets/waldos.json';
import Game from './components/Game';

function App() {
  return (
    <div className='App flex flex-col items-center justify-center'>
      <Header />
      <Game waldos={waldoData} />
    </div>
  );
}

export default App;
