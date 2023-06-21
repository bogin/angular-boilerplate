import { MinesPage } from "src/app/models/interfaces/mines-page-configurations.model";
import { Text } from "src/app/utils/text-class.utils";

export const MinesPageConfigurations: MinesPage = {
    title: new Text('Mines', true),
    board: {
        rows: 5,
        columns: 4,
        total_bombs: 5,
        markers: 0,
        firstClick: true,
        active: true,
    }
}