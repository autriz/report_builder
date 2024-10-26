import type TableRowData from "$lib/server/types/TableRowData";

class ReportAnalyzer {

    //Количество изменений статуса для каждого entity_id
    countStatusChangesByEntity(data: TableRowData[]): Map<string, number> {
        const countMap = new Map<string, number>();

        data.forEach(row => {
            countMap.set(row.entity_id, (countMap.get(row.entity_id) || 0) + 1);
        });

        return countMap;
    }

        //Количество изменений статуса, где конечный статус - "Отклонен исполнителем"
        countDeclinedStatusChanges(data: TableRowData[]): number {
            return data.filter(row => row.new_value === "Отклонен исполнителем").length;
        }

}

export default new ReportAnalyzer();