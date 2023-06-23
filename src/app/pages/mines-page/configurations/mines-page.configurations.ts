import { MinesPage } from "src/app/models/interfaces/mines-page-configurations.model";
import { Text } from "src/app/utils/text-class.utils";

export const MinesPageConfigurations: MinesPage = {
    title: new Text('Mines', true),
    board: {
        rows: 12,
        columns: 12,
        total_bombs: 1,
        cell_gap: 3,
        cell_size: 35,
        markers: 0,
        firstClick: true,
        active: true
    }
}