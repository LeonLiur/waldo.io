import React, { useEffect, useState } from 'react'
import Header from './ui/Header'
import Game from './Game'
import levels from '../assets/levels.json';
import { useParams, useSearchParams } from 'react-router-dom';
import { db } from './util/firebase';
import { onValue, ref, push, set, onChildAdded, get, child } from 'firebase/database';
import { playerType } from './util/util_types';
import { useInterval } from './ui/useInterval';

function GameScreen() {
    const { roomNumber } = useParams();

    const [playerName, setPlayerName] = useState<string>();
    const [validRoom, setValidRoom] = useState<boolean>(true);
    const [DBLoaded, setDBLoaded] = useState<boolean>(false);
    const [playerLoaded, setPlayerLoaded] = useState<boolean>(false);
    const [players, setPlayers] = useState<playerType[]>([]);
    const [ready, setReady] = useState<boolean>(false);
    const [canStart, setCanStart] = useState<boolean>(false);
    const [timeTilStart, setTimeTilStart] = useState<number>(5);
    const [gameStarted, setGameStarted] = useState<boolean>(false);

    const roomRef = ref(db, `rooms/${roomNumber}`);
    const playerRef = ref(db, `rooms/${roomNumber}/players`)

    useEffect(() => {
        const canStartListener = onValue(child(roomRef, '/canStart'), (snapshot) => {
            if (snapshot.exists()) {
                setValidRoom(true);
                setCanStart(snapshot.val())
            } else {
                setValidRoom(false);
            }
            setDBLoaded(true)
        })

        const onValuePlayerListener = onValue(playerRef, (snapshot) => {
            if (snapshot.exists()) {
                setPlayers(snapshot.val())
            }
        }
        )

        return () => {
            canStartListener();
            onValuePlayerListener();
        }
    }, [])

    useEffect(() => {
        if (!canStart) {
            setTimeTilStart(5)
        }
    }, [canStart])

    useInterval(() => {
        if (timeTilStart > 0) {
            setTimeTilStart((prev) => prev - 1)
        } else {
            setGameStarted(true)
            setCanStart(false)

        }
    }, 1000, canStart)

    return (
        <>
            <Header />
            <div className='flex flex-col justify-center items-center'>
                {gameStarted ?
                    <>
                        <Game waldos={levels} player={playerName || ""} roomNumber={roomNumber || ""} />
                    </>
                    :
                    <>
                        {!validRoom && <h1>404: Invalid Room!</h1>}
                        {DBLoaded &&
                            <>
                                <h1 className='text-lg font-bold border-t-2 left-3 right-3'>Room {roomNumber}</h1>
                                {!playerLoaded &&
                                    <div className='flex flex-col justify-center items-center'>
                                        <h1>Your name</h1>
                                        <div className='flex justify-center'>
                                            <input onChange={(e) => setPlayerName(e.target.value)} className='border-2 rounded-md w-6/12 text-center' required />
                                            <button className='bg-green-300 rounded-md px-2' onClick={() => { set(playerRef, [...players, { name: playerName, ready: false }]); setPlayerLoaded(true) }}> Join </button>
                                        </div>
                                    </div>
                                }
                                <p>Players in this room:</p>
                                <table>
                                    <tbody>
                                        {players.map((player: playerType, index: number) => {
                                            return (
                                                <tr key={index}>
                                                    <td className='px-5'>{player.name}</td>
                                                    <td className='px-5 italic font-semibold uppercase'>{player.ready ? "READY" : "--"}</td>
                                                </tr>)
                                        }
                                        )}
                                        {!playerLoaded && playerName &&
                                            <tr>
                                                <td className='px-5'>{playerName}</td>
                                                <td className='px-5 italic font-semibold uppercase'>--</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                                {playerLoaded &&
                                    <button className={`px-2 rounded-md mt-3 ${ready ? "bg-red-300" : "bg-green-300"}`} onClick={() => {
                                        setReady((prev) => !prev)
                                        set(playerRef, players.map((player: playerType) => {
                                            if (player.name === playerName) {
                                                return { name: playerName, ready: !player.ready }
                                            } else {
                                                return player
                                            }
                                        }))
                                    }}>{ready ? "Cancel" : "Ready Up!"}</button>
                                }
                                {canStart && <p>Starting in ...{timeTilStart}</p>}
                            </>
                        }
                    </>
                }
            </div >
        </>
    )
}

export default GameScreen