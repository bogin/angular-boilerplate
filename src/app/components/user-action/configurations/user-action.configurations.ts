import { UserActionType } from "src/app/models/enums/user-action-type.enum";
import { Text } from "src/app/utils/text-class.utils";

export const UserActionConfigurations = {
    [UserActionType.GetData]: {
        class: 'fa-brands fa-get-pocket get-data f-s-40',
        tooltip: new Text('get'),
    }
}