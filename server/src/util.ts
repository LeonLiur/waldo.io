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
    scoreBoardChange: ({player, score} : {player: string, score: number}) => void;
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
