import { writable, type Writable } from "svelte/store";
import type { ResultRow } from "./types";

export type DataList = Data[];
export type Data = {
    data: ResultRow[],
    columns: Column[]
}
export type Column = {
    value: string,
    column_type: ColumnType,
}
export type ColumnType = string | number | Date;

function createUserState() {
    let data: Writable<DataList> = writable([]);

    return {
        data
    }
}

let { data } = createUserState();

function getUserState() {
    return data;
}

function setUserState(state: DataList) {
    data.set(state);
}

export { getUserState, setUserState };