import React, { useEffect, useState } from 'react'
import { waldoType } from './util/util_types';
import WaldoImage from './WaldoImage';
import Timer from './Timer';

function Game({ waldos }: { waldos: waldoType[] }) {
    const [gameOver, setGameOver] = useState(false);
    const [level, setLevel] = useState(0);

    useEffect(() => {
        if (gameOver && level < waldos.length - 1) {
            setLevel(level + 1);
            setGameOver(false);
        }
    }, [gameOver, level, waldos.length]);

    return (
        <div>
            <p className='font-mono'>Where is waldo?</p>
            <div className='flex'>
                <WaldoImage waldo={waldos[level]} setGameOver={setGameOver} />
                <Timer gameOver={gameOver} />
            </div>
        </div>
    );
}

export default Game