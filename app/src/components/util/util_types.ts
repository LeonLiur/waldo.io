import { Dispatch, SetStateAction } from "react";

export type waldoSetterType = Dispatch<SetStateAction<gameStatus>>;

export type box = {
    top_left: { x: number, y: number }
    bottom_right: { x: number, y: number }
}

export type waldoType = {
    image_name: string,
    waldo_box: box,
    dimensions: {x: number, y:number},
    time: number,
}

export type guessType = {x: number, y:number}[];

export type setGuessType = Dispatch<SetStateAction<guessType>>;

export type setMouseType = Dispatch<SetStateAction<{x: number, y:number}>>;

export type playerType = {
    name: string,
    uid: string,
    ready: boolean,
}

export type roomType = {
    players: playerType[],
    host: playerType,
    key: string,
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
    gameStatusChange: ({status, player} : {status: gameStatus, player: string}) => void;
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
