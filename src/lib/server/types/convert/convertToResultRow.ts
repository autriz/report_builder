import type { ResultRow } from "../ResultRow";
import type TableRowData from "../TableRowData";

function convertToResultRow(data: TableRowData): ResultRow {
    return {
        entity_id: parseInt(data.entity_id, 10),
        create_date: new Date(data.create_date),
        property_name: data.property_name,  
        old_value: data.old_value,        
        new_value: data.new_value,                
    };
}