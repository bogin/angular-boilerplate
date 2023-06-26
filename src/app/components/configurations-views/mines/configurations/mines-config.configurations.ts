import { Validators } from "@angular/forms";
import { validInteger } from "src/app/form-validaors/integer.validator";
import { ControlType } from "src/app/models/enums/control-type.enum";
import { Form } from "src/app/models/interfaces/form.model";
import { Text } from "src/app/utils/text-class.utils";

export const MinesConfigConfigurations: Form = {
    title: new Text('Mines configurations'),
    controles: [
        {
            title: new Text('Number of rows: '),
            value: null,
            validators: [Validators.required, Validators.min(1), validInteger()],
            errors: [
                {
                    key: 'required',
                    title: new Text('Number of rows is required.')
                },
                {
                    key: 'notValidInteger',
                    title: new Text('Number of rows must be a number.')
                },
                {
                    key: 'min',
                    title: new Text('Number of rows must be at least 1.')
                }
            ],
            key: 'rows',
            type: ControlType.Input,
        },
        {
            title: new Text('Number of columns: '),
            value: null,
            validators: [Validators.required, Validators.min(1), validInteger()],
            errors: [
                {
                    key: 'required',
                    title: new Text('Number of columns is required.')
                },
                {
                    key: 'notValidInteger',
                    title: new Text('Number of columns must be a number.')
                },
                {
                    key: 'min',
                    title: new Text('Number of columns must be at least 1.')
                }
            ],
            key: 'columns',
            type: ControlType.Input,
        },
        {
            title: new Text('Number of bombs: '),
            value: null,
            validators: [Validators.required, Validators.min(1), validInteger()],
            errors: [
                {
                    key: 'required',
                    title: new Text('Number of bombs is required.')
                },
                {
                    key: 'notValidInteger',
                    title: new Text('Number of bombs must be a number.')
                },
                {
                    key: 'min',
                    title: new Text('Number of bombs must be at least 1.')
                }
            ],
            key: 'total_bombs',
            type: ControlType.Input,
        },
        {
            title: new Text('Cells gap in px: '),
            value: null,
            validators: [Validators.required, Validators.min(1), validInteger()],
            errors: [
                {
                    key: 'required',
                    title: new Text('Cells gap in px is required.')
                },
                {
                    key: 'notValidInteger',
                    title: new Text('Cells gap  must be a number.')
                }
            ],
            key: 'cells_gap',
            type: ControlType.Input,
        },
        {
            title: new Text('Cell size in px: '),
            value: null,
            validators: [Validators.required, Validators.min(1), validInteger()],
            errors: [
                {
                    key: 'required',
                    title: new Text('Cell size is required.')
                },
                {
                    key: 'notValidInteger',
                    title: new Text('Cell size must be a number.')
                },
                {
                    key: 'min',
                    title: new Text('Cell size must be at least 1.')
                }
            ],
            key: 'cells_size',
            type: ControlType.Input,
        }
    ]
};