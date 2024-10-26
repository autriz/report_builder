import type { ResultRow } from "$lib/server/types/ResultRow";

class DataAnalyzer {

    calculateAverage(data: ResultRow[], key: string): number | null{
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

    findMaxValue(data: ResultRow[], key: string): number | null{

        let maxValue = null;
    
        for (let i = 0; i < data.length; i++) {
            const value = data[i][key];
            if (typeof value === 'number') {
                if (maxValue === null) {
                    maxValue = value;
                } else {
                    if (value > maxValue) {
                        maxValue = value;
                    }
                }
            }
        }
        return maxValue;
    }

    findMinValue(data: ResultRow[], key: string): number | null {
        let minValue = null;
    
        for (let i = 0; i < data.length; i++) {
            const value = data[i][key];
            if (typeof value === 'number') {
                if (minValue === null) {
                    minValue = value;
                } else {
                    if (value < minValue) {
                        minValue = value;
                    }
                }
            }
        }
        return minValue;
    }

    countUniqueValues(data: ResultRow[], key: string): number {
        const uniqueValues = new Set();
        data.forEach(row => {
            uniqueValues.add(row[key]);
        });
        return uniqueValues.size;
    }

    calculateSum(data: ResultRow[], key: string): number {
        let sum = 0;
        data.forEach(row => {
            const value = row[key];
            if (typeof value === 'number') {
                sum += value;
            }
        });
        return sum;
    }

}

export default new DataAnalyzer();
