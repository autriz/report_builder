import type TableRowData from "../types/TableRowData";

export default interface FileHandler {
    upload:()=>void;

    fandle:()=>void;

    generate: (data: TableRowData[], outputFilePath: string) => void;
}