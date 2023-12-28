import { Dispatch, SetStateAction } from "react";

export type waldoSetterType = Dispatch<SetStateAction<boolean>>;

export type box = {
    top_left: { x: number, y: number }
    bottom_right: { x: number, y: number }
}

export type waldoType = {
    image_name: string,
    waldo_box: box,
}