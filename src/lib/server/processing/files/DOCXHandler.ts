    import { Document, Packer, Table, TableCell, TableRow, Paragraph } from "docx";
    import fs from "fs";
    import path from "path";
    import type TableRowData from "../../types/TableRowData";
    import type FileHandler from "./FileHandler.interface";

    class DOCXHandler implements FileHandler{

        upload(){

        }

        handle(){
            
        }

        generate(data: TableRowData[], outputFileName: string) {

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

            const doc = new Document({
                sections: [
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