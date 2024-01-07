import React, { useEffect, useState } from 'react'
import Header from './ui/Header'
import Game from './Game'
import levels from '../assets/levels.json';
import { useParams, useSearchParams } from 'react-router-dom';
import { auth, db } from './util/firebase';
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
    const [starting, setStarting] = useState<boolean>(false);
    const [allReady, setAllReady] = useState<boolean>(false);
    const [hostID, setHostID] = useState<string>();
    const [timeTilStart, setTimeTilStart] = useState<number>(5);
    const [gameStarted, setGameStarted] = useState<boolean>(false);

    const roomRef = ref(db, `rooms/${roomNumber}`);
    const playerRef = ref(db, `rooms/${roomNumber}/players`)

    useEffect(() => {
        const hostListener = onValue(child(roomRef, '/host'), (snapshot) => {
            if (snapshot.exists()) {
                setValidRoom(true);
                setHostID(snapshot.val())
            } else {
                setValidRoom(false);
            }
            setDBLoaded(true)
        })
        const startingListener = onValue(child(roomRef, '/starting'), (snapshot) => {
            if (snapshot.exists()) {
                setStarting(snapshot.val())
            }
        })
        const startedListener = onValue(child(roomRef, '/started'), (snapshot) => {
            if (snapshot.exists()) {
                setGameStarted(snapshot.val())
            }
        })

        const onValuePlayerListener = onValue(playerRef, (snapshot) => {
            if (snapshot.exists()) {
                setPlayers(snapshot.val())
                setAllReady(snapshot.val().every((player: playerType) => player.ready))
            }
        }
        )
        console.log(auth.currentUser?.uid)

        return () => {
            hostListener();
            startingListener();
            startedListener();
            onValuePlayerListener();
        }
    }, [])

    useEffect(() => {
        if (!(starting && allReady)) {
            setTimeTilStart(5)
        }
    }, [starting, allReady])

    useEffect(() => { if (!allReady) setStarting(false) }, [allReady])

    useInterval(() => {
        if (timeTilStart > 0) {
            setTimeTilStart((prev) => prev - 1)
        } else {
            setGameStarted(true)
            setStarting(false)

            set(child(roomRef, '/started'), true)
            set(child(roomRef, '/starting'), false)
        }
    }, 1000, starting && allReady)

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
                                            <button className='bg-green-300 rounded-md px-2' onClick={() => { set(playerRef, [...players, { name: playerName, ready: false, uid: auth.currentUser?.uid }]); setPlayerLoaded(true) }}> Join </button>
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
                                                    {player.uid === hostID && <td>(Host)</td>}
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
                                {(auth.currentUser?.uid === hostID) && allReady && !starting && <button className={`italic font-semibold uppercase disabled:bg-slate-300 px-2 rounded-md ${!allReady && 'disabled'} bg-yellow-300 mt-3`} onClick={() => { setStarting(!starting); set(child(roomRef, '/starting'), !starting) }}>START GAME</button>}
                                {starting && allReady && <p>Starting in ...{timeTilStart}</p>}
                            </>
                        }
                    </>
                }
            </div >
        </>
    )
}

export default GameScreen