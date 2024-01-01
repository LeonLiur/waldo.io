import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ClientToServerEvents, Found, Not_Found, Playing, ServerToClientEvents, gameStatus, waldoType } from './util/util_types';
import { io, Socket } from "socket.io-client";
import WaldoImage from './WaldoImage';
import Timer from './Timer';
import Leaderboard, { leaderboardEntry } from './Leaderboard';


function Game({ waldos, player }: { waldos: waldoType[], player: string }) {
    const [gameStatus, setGameStatus] = useState<gameStatus>(Playing);
    const [level, setLevel] = useState(0);
    const [leaderboard, setLeaderboard] = useState<leaderboardEntry[]>([]);

    const socketRef = useRef(io('http://localhost:8000'))

    const socket = socketRef.current;

    useEffect(() => {
        socket.disconnect();
    })

    useEffect(() => {
        socket.on("connect", () => {
            console.log(`connected: ${socket.id}`)
        })

        socket.on("disconnect", () => {
            console.log(`disconnected: ${socket.id}`);
        });

        socket.on("scoreBoardChange", ({ player, score }: { player: string, score: number }) => {
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
        });
    }, [socket])

    useEffect(() => {
        if (gameStatus !== Playing && level < waldos.length - 1) {
            setTimeout(() => {
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
    }, [gameStatus, socket, player])

    return (
        <div>
            <p className='font-mono'>Where is waldo?</p>
            <div className='flex'>
                <WaldoImage waldo={waldos[level]} setGameStatus={setGameStatus} />
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