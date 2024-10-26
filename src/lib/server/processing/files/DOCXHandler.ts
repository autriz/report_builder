import { Document, Packer, Table, TableCell, TableRow, Paragraph } from "docx";
import fs from "fs";
import path from "path";
import type TableRowData from "../../types/TableRowData";
import type FileHandler from "./FileHandler.interface";
import DataAnalyzer from "../calculations/DataAnalyzer";
import ReportAnalyzer from "../calculations/ReportAnalyzer";
import convertToResultRow from "$lib/server/types/convert/convertToResultRow";
import convertToResultRowArray from "$lib/server/types/convert/convertToResultRowArray";

    class DOCXHandler implements FileHandler{

        upload(){

        }

        handle(){
            
        }

        generate(data: TableRowData[], outputFileName: string) {

            const dataAnalyzer = DataAnalyzer;
            const reportAnalyzer = ReportAnalyzer;

            function generateReport(data: TableRowData[]): Paragraph[] {
                const uniqueEntities = reportAnalyzer.countStatusChangesByEntity(data);
            
                const uniqueEntityCount = uniqueEntities.size;
            
                const entityReport = Array.from(uniqueEntities.entries()).map(
                    ([entityId, count]) => `Entity ID: ${entityId}, Количество изменений статуса: ${count}`
                );
            
                const paragraphs = [
                    new Paragraph(`Отчёт по данным:`),
                    new Paragraph(`Уникальных Entity ID: ${uniqueEntityCount}`),
                    new Paragraph(`---------------------------`),
                    ...entityReport.map(entry => new Paragraph(entry)),
                ];
            
                return paragraphs;
            }
            
            

            const outputDir = path.resolve("output");

            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir);
            }

            const outputFilePath = path.join(outputDir, outputFileName);

            const tableHeaders = new TableRow({
                children: [
                    new TableCell({ children: [new Paragraph("Entity ID")] }),
                    new TableCell({ children: [new Paragraph("Create Date")] }),
                    new TableCell({ children: [new Paragraph("Property Name")] }),
                    new TableCell({ children: [new Paragraph("Old Value")] }),
                    new TableCell({ children: [new Paragraph("New Value")] }),
                ],
            });

            const tableRows = data.map((item) => {
                return new TableRow({
                    children: [
                        new TableCell({ children: [new Paragraph(item.entity_id)] }),
                        new TableCell({ children: [new Paragraph(item.create_date)] }),
                        new TableCell({ children: [new Paragraph(item.property_name)] }),
                        new TableCell({ children: [new Paragraph(item.old_value)] }),
                        new TableCell({ children: [new Paragraph(item.new_value)] }),
                    ],
                });
            });

            const table = new Table({
                rows: [tableHeaders, ...tableRows],
            });
            
            const reportParagraphs = generateReport(data);

            const doc = new Document({
                sections: [
                    {
                        children:[...reportParagraphs]
                    },
                    {
                        children: [table],
                    },
                ],
            });

            Packer.toBuffer(doc).then((buffer) => {
                fs.writeFileSync(outputFilePath, buffer);
                console.log(`DOCX file generated at ${outputFilePath}`);
            });
        }

    }

    export default new DOCXHandler();