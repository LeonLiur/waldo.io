import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ClientToServerEvents, Found, Not_Found, Playing, ServerToClientEvents, gameStatus, waldoType } from './util/util_types';
import { io, Socket } from "socket.io-client";
import { socket } from '.././socket';
import WaldoImage from './WaldoImage';
import Timer from './Timer';
import Leaderboard, { leaderboardEntry } from './Leaderboard';


function Game({ waldos, player }: { waldos: waldoType[], player: string }) {
    const [gameStatus, setGameStatus] = useState<gameStatus>(Playing);
    const [level, setLevel] = useState(0);
    const [leaderboard, setLeaderboard] = useState<leaderboardEntry[]>([]);
    const [guesses, setGuesses] = useState<{ x: number, y: number }[]>([]);

    useEffect(() => {
        const onConnect = () => {
            console.log(`connected: ${socket.id}`)
        }

        const onDisconnect = () => {
            console.log(`disconnected: ${socket.id}`);
        }

        const onScoreBoardChange = ({ player, score }: { player: string, score: number }) => {
            console.log(`[+] received: scoreBoardChange ${player} ${score}`)
            setLeaderboard((prev) => {
                let newLeaderboard = [...prev];
                const index = newLeaderboard.findIndex((entry) => entry.name === player);
                if (index === -1) {
                    newLeaderboard.push({ name: player, score: score });
                } else {
                    newLeaderboard[index].score += score;
                }
                return newLeaderboard;
            })
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('scoreBoardChange', onScoreBoardChange);

        return () => {
            socket.disconnect();
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('scoreBoardChange')
        };
    }, []);

    useEffect(() => {
        if (gameStatus !== Playing && level < waldos.length - 1) {
            setTimeout(() => {
                setGuesses([])
                setGameStatus(Playing)
                setLevel(level + 1)
            }, 5000);
        }
    }, [gameStatus, level, waldos.length]);

    useEffect(() => {
        if (gameStatus === Found || gameStatus === Not_Found) {
            console.log("[+] Sent: /gameStatusChange/")
            socket.emit('gameStatusChange', { status: gameStatus, player: player })
        }
    }, [gameStatus, player])

    return (
        <div>
            <p className='font-mono'>Where is waldo?</p>
            <div className='flex'>
                <WaldoImage waldo={waldos[level]} gameStatus={gameStatus} setGameStatus={setGameStatus} guesses={guesses} setGuesses={setGuesses}/>
                <div className='flex-col w-2/12'>
                    <Timer gameStatus={gameStatus} setGameStatus={setGameStatus} levelTime={waldos[level].time} />
                    {gameStatus === Not_Found && <div className='bg-red-500'>You did NOT find Waldo</div>}
                    {gameStatus === Found && <div className='bg-green-500'>You found Waldo!</div>}
                    <Leaderboard leaderboard={leaderboard} />
                </div>
            </div>
        </div>
    );
}

export default Game