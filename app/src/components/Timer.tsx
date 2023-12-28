import React, { useEffect, useState } from 'react'

export default function Timer({ gameOver }: { gameOver: boolean }) {
    const [time, setTime] = useState(60);
    const [timer, setTimer] = useState(setInterval(() => {
        if (time > 0) {
            setTime(time - 1)
        };
    }, 1000));

    useEffect(() => {
        if (gameOver) {
            clearInterval(timer);
            setTimeout(() => {
            }, 1000);;
        }
    }, [gameOver])

    return (
        <div className='flex-col w-2/12'>
            <p className='font-mono'>{gameOver ? 60 : time}</p>
            {gameOver && <div className='bg-red-500'>Game Over</div>}
        </div>
    )
}
