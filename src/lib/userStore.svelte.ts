import { get, writable, type Writable } from "svelte/store";
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
export type Files = { [key: string]: Data | undefined };

let state: Writable<Files> = writable({});
let dbState: Writable<IDBDatabase | undefined> = writable(undefined);

function updateStorage() {
    sessionStorage.setItem("files", JSON.stringify(get(state)))
}

function getFile(fileName: string) {
    let file = get(state)[fileName];

    return file;
}

function addFile(fileName: string, data: Data) {
    state.update(($state) => {
        $state[fileName] = data;

        return $state;
    });

    updateStorage();
}

function updateFile(fileName: string, data: Data) {
    state.update(($state) => {
        $state[fileName] = data;

        return $state;
    });

    updateStorage();
}

function getFileNames() {
    return Object.keys(get(state));
}

function removeFile(fileName: string) {
    state.update(($state) => {
        if ($state[fileName] !== undefined) {
            $state[fileName] = undefined;
        };

        return $state;
    });

    updateStorage();
}

export function initUserState(data: any) {
    state.set(data);
}

function getTransaction(storeNames: string[], mode: IDBTransactionMode) {
    return get(dbState)?.transaction(storeNames, mode);
}

export function initDBState(db: IDBDatabase) {
    dbState.set(db);
}

function getUserState() {
    return {
        state,
        getFile,
        addFile,
        removeFile,
        updateFile,
        getFileNames,
    }
}

function getDBState() {
    return {
        dbState,
        getTransaction,
    }
}

function setUserState(newState: Files) {
    state.set(newState);

    updateStorage();
}

export { getUserState, setUserState, getDBState };