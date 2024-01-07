import { useEffect, useState } from 'react'
import Header from './ui/Header'
import { db } from './util/firebase';
import { useNavigate } from 'react-router-dom';
import { child, onValue, push, ref, set } from 'firebase/database';


function Home() {
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState<string>();

    const roomsRef = ref(db, 'rooms/');

    const createRoom = () => {
        const key = [...Array(4)].map(() => Math.random() > 0.5 ? (Math.random() * 36 | 0).toString(36) : (Math.random() * 36 | 0).toString(36).toUpperCase()).join('');
        set(child(roomsRef, key), {
            roomKey: key,
            players: [],
            host: {},
            canStart: false,
            started: false
        })
        navigate(`/${key}`)
    }

    const joinRoom = () => {
        navigate(`/${inputValue}`)
    }

    return (
        <>
            <Header />
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
        </>
    )
}

export default Home