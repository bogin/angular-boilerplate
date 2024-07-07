import { MinesPage } from "src/app/models/interfaces/mines-page-configurations.model";
import { Text } from "src/app/utils/text-class.utils";

export const MinesPageConfigurations: MinesPage = {
    title: new Text('mines_page.title'),
    board: {
        markers: 0,
        firstClick: true,
        active: true
    }
}