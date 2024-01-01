import React, { useEffect, useMemo, useState } from 'react'
import { ClientToServerEvents, Found, Not_Found, Playing, ServerToClientEvents, gameStatus, waldoType } from './util/util_types';
import { io, Socket } from "socket.io-client";
import WaldoImage from './WaldoImage';
import Timer from './Timer';
import Leaderboard from './Leaderboard';

function Game({ waldos }: { waldos: waldoType[] }) {
    const [gameStatus, setGameStatus] = useState<gameStatus>(Playing);
    const [level, setLevel] = useState(0);
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = useMemo(() => io(), []);

    socket.on("connect", () => {
        console.log(`connected: ${socket.id}`)
    })

    socket.on("disconnect", () => {
        console.log(`disconnected: ${socket.id}`);
      });

    useEffect(() => {
        if (gameStatus !== Playing && level < waldos.length - 1) {
            setTimeout(() => {
                setGameStatus(Playing)
                setLevel(level + 1)
            }, 5000);
        }
    }, [gameStatus, level, waldos.length]);

    useEffect(() => {
        socket.emit('gameStatusChange', gameStatus)
    }, [gameStatus, socket])

    return (
        <div>
            <p className='font-mono'>Where is waldo?</p>
            <div className='flex'>
                <WaldoImage waldo={waldos[level]} setGameStatus={setGameStatus} />
                <div className='flex-col w-2/12'>
                    <Timer gameStatus={gameStatus} setGameStatus={setGameStatus} levelTime={waldos[level].time} />
                    {gameStatus === Not_Found && <div className='bg-red-500'>You did NOT find Waldo</div>}
                    {gameStatus === Found && <div className='bg-green-500'>You found Waldo!</div>}
                    <Leaderboard leaderboard = {[{name: 'sam', score: 100}, {'name': 'alto', score: 500}]}/>
                </div>
            </div>
        </div>
    );
}

export default Game