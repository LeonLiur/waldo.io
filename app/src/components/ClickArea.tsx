import React, { useEffect, useState } from "react";
import { waldoSetterType } from "./util/util_types";

type box = {
    top_left: { x: number, y: number }
    bottom_right: { x: number, y: number }
}

export default function ClickArea({ className, waldo_box, setFoundWaldo }: { className: string, waldo_box: box, setFoundWaldo: waldoSetterType }) {
    const mousePosition = useMousePosition();
    const [guesses, setGuesses] = useState<{ x: number, y: number }[]>([]);
    const [frameWidth, setFrameWidth] = useState<number>(0);
    const [frameHeight, setFrameHeight] = useState<number>(0);

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
            setFoundWaldo(true);
        } else {
            setGuesses([...guesses, { x: x_ratio, y: y_ratio }]);
        }
    }

    return (
        <div className={`${className} cursor-crosshair`} onClick={handleClick}>
            {guesses.map((guess: { x: number, y: number }, i: number) => {
                return (
                    <img style={{ left: guess.x * frameWidth - 0.5 * frameWidth / 40, top: guess.y * frameHeight - 0.5 * frameHeight / 40, position: 'absolute' }} className="w-1/40 h-1/40" key={i} src="cross.svg" alt="cross"></img>
                )
            })}
        </div >

    )
}

const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return mousePosition;
};

