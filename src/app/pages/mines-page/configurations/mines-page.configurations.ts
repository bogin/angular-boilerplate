import { MinesPage } from "src/app/models/interfaces/mines-page-configurations.model";
import { Text } from "src/app/utils/text-class.utils";

export const MinesPageConfigurations: MinesPage = {
    title: new Text('Mines', true),
    board: {
        rows: 10,
        columns: 80,
        total_bombs: 6,
        cell_gap: 3,
        cell_size: 35,
        markers: 0,
        firstClick: true,
        active: true
    }
}