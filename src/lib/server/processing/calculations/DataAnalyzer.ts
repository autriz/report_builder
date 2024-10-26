import type { ResultRow } from "$lib/server/types/ResultRow";

class DataAnalyzer {

    calculateAverage(data: ResultRow[], key: string){
        let total = 0;
        let count = 0;
    
        for (let i = 0; i < data.length; i++) {
            let value = data[i][key];
            if (typeof value === 'number') {
                total += value;
                count++;
            }
        }

        if (count === 0) {
            return null;
        }
    
        return total / count;
    }

    //[{ a: 10, b: 5, c: '50', value: 'value', date: new Date('2023-10-26') }]
    countByDate(data: ResultRow[], dateKey: string): Map<string, number> {
        const dateCountMap = new Map<string, number>();
    
        data.forEach(row => {
            const date = row[dateKey];
            if (date instanceof Date) {
                const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
                dateCountMap.set(formattedDate, (dateCountMap.get(formattedDate) || 0) + 1);
            }
        });
    
        return dateCountMap;
    }
    
}

export default new DataAnalyzer();
