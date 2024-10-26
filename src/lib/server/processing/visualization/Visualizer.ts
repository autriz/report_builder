import type TableRowData from "$lib/server/types/TableRowData";
import type { ResultRow } from "$lib/types";


class Visualizer {

    visualizeResultRow(data: ResultRow[], option:string){
        switch (option) {
            case 'donut':
                
                break;
            case 'histogram':

                break;

            default:
                break;
        }
    }

}

export default new Visualizer()