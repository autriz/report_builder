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

}

export default new DataAnalyzer();
