import { Text } from "src/app/utils/text-class.utils";
import { ControlType } from "../enums/control-type.enum";
import { Message } from "primeng/api";

export interface Form {
    title: Text;
    controles: FormControl[]
    notification_messages?: {
        success?: Message;
        failure?: Message;
    }
}

export interface FormControl {
    title: Text;
    value: unknown;
    validators: unknown[];
    errors: { key: string; title: Text }[];
    key: string;
    type: ControlType;

    optionLabel?: string;
    optionValue?: string;
    options?: { key: string; value: string; selected?: boolean }[];
    input_type?: string;
}