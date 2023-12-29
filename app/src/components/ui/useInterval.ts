import { useEffect, useRef } from "react";

export function useInterval(callback: Function, delay: number | null, running: boolean) {
    const savedCallback = useRef<Function>(() => { });

    // update the callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback])

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (delay !== null && running) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id); // cleanup function called on next useEffect call
        }
    }, [delay, running])
}