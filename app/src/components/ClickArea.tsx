import { useEffect, useState } from "react";
import { Found, gameStatus, guessType, setGuessType, setMouseType, waldoSetterType } from "./util/util_types";

type box = {
    top_left: { x: number, y: number }
    bottom_right: { x: number, y: number }
}

export default function ClickArea({ waldo_box, gameStatus, setGameStatus, guesses, setGuesses, setMousePos }: propType) {
    const [frameWidth, setFrameWidth] = useState<number>(0);
    const [frameHeight, setFrameHeight] = useState<number>(0);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    });

    const handleClick = (e: any) => {
        const rect: DOMRect = e.target.getBoundingClientRect();
        setFrameWidth(rect.width);
        setFrameHeight(rect.height);
        const x_ratio: number = (e.clientX - rect.left) / rect.width
        const y_ratio: number = (e.clientY - rect.top) / rect.height

        const found: boolean = (waldo_box.top_left.x < x_ratio && x_ratio < waldo_box.bottom_right.x) && (waldo_box.top_left.y < y_ratio && y_ratio < waldo_box.bottom_right.y)
        console.log("CLICK:", x_ratio, y_ratio)
        console.log("FOUND:", found)

        if (found) {
            setGameStatus(Found);
        } else {
            setGuesses([...guesses, { x: x_ratio, y: y_ratio }]);
        }
    }

    return (
        <div className="absolute top-0 left-0 w-full h-full cursor-crosshair" onClick={handleClick}>
            {guesses.map((guess: { x: number, y: number }, i: number) => {
                return (
                    <img style={{ left: guess.x * frameWidth - 0.5 * frameWidth / 40, top: guess.y * frameHeight - 0.5 * frameHeight / 40, position: 'absolute' }} className="w-1/40 h-1/40" key={i} src="cross.svg" alt="cross"></img>
                )
            })}
            {gameStatus === Found &&
                <div className='opacity-50 bg-green-400' style={{
                    left: waldo_box.top_left.x * frameWidth - (waldo_box.bottom_right.x - waldo_box.top_left.x) * frameWidth / 4,
                    top: waldo_box.top_left.y * frameHeight - (waldo_box.bottom_right.y - waldo_box.top_left.y) * frameHeight / 4,
                    width: (waldo_box.bottom_right.x - waldo_box.top_left.x) * frameWidth * 1.5,
                    height: (waldo_box.bottom_right.y - waldo_box.top_left.y) * frameHeight * 1.5,
                    position: 'absolute'
                }}></div>}
        </div >

    )
}

type propType = { waldo_box: box, gameStatus: gameStatus, setGameStatus: waldoSetterType, guesses: guessType, setGuesses: setGuessType, setMousePos: setMouseType }