import { Text } from "src/app/utils/text-class.utils";
import { ControlType } from "../enums/control-type.enum";

export interface Form {
    title: Text;
    controles: FormControl[]
}

export interface FormControl {
    title: Text;
    value: any;
    validators: any[];
    errors: { key: string; title: Text }[];
    key: string;
    type: ControlType;
    input_type?: string;
}