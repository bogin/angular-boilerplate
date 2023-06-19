import { Text } from "src/app/utils/text-class.utils";
import { UserActionType } from "../enums/user-action-type.enum";

export interface UserAction {
    type: UserActionType;
    tooltip?: Text;
    class?: string;
}