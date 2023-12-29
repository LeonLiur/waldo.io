import React, { useEffect, useState } from 'react'
import { Found, Not_Found, Playing, gameStatus, waldoType } from './util/util_types';
import WaldoImage from './WaldoImage';
import Timer from './Timer';

function Game({ waldos }: { waldos: waldoType[] }) {
    const [gameStatus, setGameStatus] = useState<gameStatus>(Playing);
    const [level, setLevel] = useState(0);

    useEffect(() => {
        if (gameStatus !== Playing && level < waldos.length - 1) {
            setTimeout(() => {
                setGameStatus(Playing)
                setLevel(level + 1)
            }, 5000);
        }
    }, [gameStatus, level, waldos.length]);

    return (
        <div>
            <p className='font-mono'>Where is waldo?</p>
            <div className='flex'>
                <WaldoImage waldo={waldos[level]} setGameStatus={setGameStatus} />
                <div className='flex-col w-2/12'>
                    <Timer gameStatus={gameStatus} setGameStatus={setGameStatus} levelTime={waldos[level].time} />
                    {gameStatus === Not_Found && <div className='bg-red-500'>You did NOT find Waldo</div>}
                    {gameStatus === Found && <div className='bg-green-500'>You found Waldo!</div>}
                </div>
            </div>
        </div>
    );
}

export default Game