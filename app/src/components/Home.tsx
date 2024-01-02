import React, { FormEvent, useState } from 'react'
import Header from './ui/Header'

function Home() {
    const [roomNumber, setRoomNumber] = useState<number>(-1);
    const [inputValue, setInputValue] = useState<number>(-1);
    const [players, setPlayers] = useState<string[]>([]);

    const joinRoom = (event: FormEvent) => {
        event.preventDefault();
        setRoomNumber(inputValue);
    }

    return (
        <>
            <Header />
            <div className='flex flex-col justify-center items-center'>
                <div className='w-1/2 flex flex-col justify-center items-center'>
                    <h1>Join a room</h1>
                    <form onSubmit={joinRoom} className='border-gray-300 border-2 p-2 rounded-md flex-col flex justify-center items-center'>
                        <label htmlFor='room_number' className='left-0'>Room number</label>
                        <input type='number' id='room_number' className='border-dashed border w-1/2' onChange={(e) => setInputValue(Number(e.target.value))} required></input>
                        <button type='submit' className='bg-gray-400 rounded-lg border-black mt-2 px-3'>Join</button>
                    </form>
                </div>
                {roomNumber != -1 &&
                    <div className='w-2/3 flex flex-col justify-center items-center border-3 border-green-300'>
                        <h1 className='text-lg'>Room {roomNumber}</h1>
                        {players.map((player: string, index: number) => {
                            return <p key={index}>{player}</p>
                        })}
                    </div>
                }
            </div>
        </>
    )
}

export default Home