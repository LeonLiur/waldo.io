import React, { FormEvent, useEffect, useState } from 'react'
import Header from './ui/Header'
import { db } from './util/firebase';
import { onValue, ref, push, set, onChildAdded, get, child } from 'firebase/database';
import { playerType, roomType } from './util/util_types';


function Home() {
    const [playerName, setPlayerName] = useState<string>();
    const [roomKey, setRoomKey] = useState<string>();
    const [inputValue, setInputValue] = useState<string>();
    const [room, setRoom] = useState<roomType>();
    const [openRooms, setOpenRooms] = useState<{ [key: string]: string | null }>({});
    const [validRoom, setValidRoom] = useState<boolean>(true);
    const roomsRef = ref(db, 'rooms/');

    useEffect(() => {
        return () => {
            onChildAdded(roomsRef, (snapshot) => {
                if (snapshot.exists()) {
                    const sk = snapshot.key;
                    const rk = snapshot.val().roomKey;
                    setOpenRooms((prev) => { return { ...prev, [rk]: sk } })
                }
            })();
        }
    }, [])

    const createRoom = () => {
        if (playerName !== undefined) {
            const pushRoomsRef = push(roomsRef);
            const key = [...Array(4)].map(() => Math.random() > 0.5 ? (Math.random() * 36 | 0).toString(36) : (Math.random() * 36 | 0).toString(36).toUpperCase()).join('');
            set(pushRoomsRef, {
                roomKey: key,
                players: [{ "name": playerName }],
                host: { "name": playerName },
            })
            setRoomKey(key);
            setValidRoom(true);
            setRoom({ players: [{ name: playerName }], host: { name: playerName }, key: key })
        }
    }

    const joinRoom = () => {
        if (!inputValue) return;

        const rk: string = inputValue;
        if (rk in openRooms) {
            setValidRoom(true);
            const storeKey: string | null = openRooms[rk];
            if (storeKey === null) {
                setValidRoom(false);
                return;
            }

            get(child(roomsRef, storeKey)).then((snapshot) => {
                if (!snapshot.exists()) {
                    setValidRoom(false);
                    return;
                }
                setRoom(snapshot.val())
                setValidRoom(true);
                set(child(roomsRef, `${storeKey}/players`), [...snapshot.val().players, { name: playerName }])
            })
        } else {
            setValidRoom(false);
        }
    }

    return (
        <>
            <Header />
            <div className='flex flex-col justify-center items-center'>
                <h1>Your name</h1>
                <input onChange={(e) => setPlayerName(e.target.value)} className='border-2 rounded-sm w-1/12 text-center' required />
            </div>
            {playerName &&
                <>
                    <div className='flex justify-center items-start'>
                        <div className='w-1/4 flex justify-center items-center'>
                            <div className='border-gray-300 broder-2 p-2 round-md flex-col flex justify-center items-center'>
                                <h1>Create a room</h1>
                                <button onClick={createRoom} className='bg-gray-400 rounded-sm mt-2 px-2'>Create</button>
                            </div>
                        </div>
                        <div className='w-1/4 flex justify-center items-center'>
                            <div className='border-gray-300 broder-2 p-2 round-md flex-col flex justify-center items-center'>
                                <h1>Join a room</h1>
                                <input onChange={(e) => setInputValue(e.target.value)} className='border-2 rounded-sm w-3/12 text-center' />
                                {inputValue && <button onClick={joinRoom} className='bg-gray-400 rounded-sm mt-2 px-2'>Join</button>}
                            </div>
                        </div>
                    </div>
                    {!validRoom &&
                        <div className='flex justify-center items-center'>
                            <p className='w-3/12 bg-red-500 text-center'>Invalid room number </p>
                        </div>
                    }
                    {room &&
                        <div className='flex flex-col justify-center items-center border-3 border-green-300'>
                            <h1 className='text-lg'>Room {roomKey}</h1>
                            {room.players.map((player: { name: string }, index: number) => {
                                return <p key={index}>{player.name}</p>
                            })}
                        </div>
                    }
                </>
            }
        </>
    )
}

export default Home