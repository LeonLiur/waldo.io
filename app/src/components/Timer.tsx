import React, { useEffect, useState } from 'react'
import { useInterval } from './ui/useInterval';
import { Not_Found, Playing, gameStatus, waldoSetterType } from './util/util_types';

export default function Timer({ gameStatus, setGameStatus, levelTime }: { gameStatus: gameStatus, setGameStatus: waldoSetterType, levelTime: number }) {
    const [time, setTime] = useState(60);

    useInterval(() => {
        if (time > 0) {
            setTime(time - 1)
        } else {
            setGameStatus(Not_Found)
        }
    }, 1000, gameStatus === Playing)

    useEffect(() => {
        setTime(levelTime)
    }, [levelTime])

    return (
        <p className='font-mono'>{gameStatus ? '--' : time}</p>
    )
}
