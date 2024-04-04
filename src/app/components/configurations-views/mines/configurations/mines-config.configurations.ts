import { Validators } from "@angular/forms";
import { validInteger } from "src/app/form-validaors/integer.validator";
import { ControlType } from "src/app/models/enums/control-type.enum";
import { Form } from "src/app/models/interfaces/form.model";
import { Text } from "src/app/utils/text-class.utils";

export const MinesConfigConfigurations: Form = {
    title: new Text('mines_configurations.page_title'),
    controles: [
        {
            title: new Text('mines_configurations.form.rows.text'),
            value: null,
            validators: [Validators.required, Validators.min(1), validInteger()],
            errors: [
                {
                    key: 'required',
                    title: new Text('mines_configurations.form.rows.errors.required')
                },
                {
                    key: 'notValidInteger',
                    title: new Text('mines_configurations.form.rows.errors.number')
                },
                {
                    key: 'min',
                    title: new Text('mines_configurations.form.rows.errors.min')
                }
            ],
            key: 'rows',
            type: ControlType.Input,
        },
        {
            title: new Text('mines_configurations.form.columns.text'),
            value: null,
            validators: [Validators.required, Validators.min(1), validInteger()],
            errors: [
                {
                    key: 'required',
                    title: new Text('mines_configurations.form.columns.errors.required')
                },
                {
                    key: 'notValidInteger',
                    title: new Text('mines_configurations.form.columns.errors.number')
                },
                {
                    key: 'min',
                    title: new Text('mines_configurations.form.columns.errors.min')
                }
            ],
            key: 'columns',
            type: ControlType.Input,
        },
        {
            title: new Text('mines_configurations.form.total_bombs.text'),
            value: null,
            validators: [Validators.required, Validators.min(1), validInteger()],
            errors: [
                {
                    key: 'required',
                    title: new Text('mines_configurations.form.total_bombs.errors.required')
                },
                {
                    key: 'notValidInteger',
                    title: new Text('mines_configurations.form.total_bombs.errors.number')
                },
                {
                    key: 'min',
                    title: new Text('mines_configurations.form.total_bombs.errors.min')
                }
            ],
            key: 'total_bombs',
            type: ControlType.Input,
        },
        {
            title: new Text('mines_configurations.form.cells_gap.text'),
            value: null,
            validators: [Validators.required, Validators.min(1), validInteger()],
            errors: [
                {
                    key: 'required',
                    title: new Text('mines_configurations.form.cells_gap.errors.required')
                },
                {
                    key: 'notValidInteger',
                    title: new Text('mines_configurations.form.cells_gap.errors.number')
                }
            ],
            key: 'cells_gap',
            type: ControlType.Input,
        },
        {
            title: new Text('mines_configurations.form.cells_size.text'),
            value: null,
            validators: [Validators.required, Validators.min(1), validInteger()],
            errors: [
                {
                    key: 'required',
                    title: new Text('mines_configurations.form.cells_size.errors.required')
                },
                {
                    key: 'notValidInteger',
                    title: new Text('mines_configurations.form.cells_size.errors.number')
                },
                {
                    key: 'min',
                    title: new Text('mines_configurations.form.cells_size.errors.number')
                }
            ],
            key: 'cells_size',
            type: ControlType.Input,
        }
    ],
    notification_messages: {
        success: {
            severity: "success",
            summary: "Success",
            detail: "Successfuly saved configuration",
            sticky: false,
            key: 'app-toast',
            life: 2000,
        },
        failure: {
            severity: 'failure',
            summary: 'Failure',
            detail: 'Failed to save configuration',
            sticky: false,
            key: 'app-toast',
            life: 2000,
        }
    }
};