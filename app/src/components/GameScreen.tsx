import React from 'react'
import Header from './ui/Header'
import Game from './Game'
import levels from '../assets/levels.json';
import { useParams, useSearchParams } from 'react-router-dom';

function GameScreen() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { roomNumber } = useParams();
    const playerName = searchParams.get('playerName');

    return (

        <div className='App flex flex-col items-center justify-center'>
            <Header />
            roomNumber && playerName ?
            <Game waldos={levels} player={playerName || ""} roomNumber={roomNumber || ""} />
            :
            <p>ROOM NOT FOUND</p>
        </div>
    )
}

export default GameScreen