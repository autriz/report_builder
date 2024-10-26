import DOCXHandler from "../processing/files/DOCXHandler";
import type TableRowData from "../types/TableRowData";

export default class FileService {
    generateDOCX(data: TableRowData[], outputFilePath: string) {
        DOCXHandler.generate(data, outputFilePath);
    }
}