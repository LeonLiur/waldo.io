import React from 'react'
import Header from './ui/Header'
import Game from './Game'
import levels from '../assets/levels.json';

function GameScreen() {
    return (
        <div className='App flex flex-col items-center justify-center'>
            <Header />
            <Game waldos={levels} player="leo" />
        </div>
    )
}

export default GameScreen