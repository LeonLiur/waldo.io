export type box = {
    top_left: { x: number, y: number }
    bottom_right: { x: number, y: number }
}

export type waldoType = {
    image_name: string,
    waldo_box: box,
    time: number,
}

export enum gameStatus {
    Playing = 0,
    Found = 1,
    Not_Found = 2,
}

export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
    gameStatusChange: (status: gameStatus) => void;
}

export interface InterServerEvents {
    
}

export interface SocketData {
    name: string;
    age: number;
}

export const Playing = gameStatus.Playing;
export const Found = gameStatus.Found;
export const Not_Found = gameStatus.Not_Found;
