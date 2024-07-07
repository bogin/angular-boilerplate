import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Form, FormControl } from '../../models/interfaces/form.model';
import { ControlType } from 'src/app/models/enums/control-type.enum';
import { NotificationType } from 'src/app/models/enums/notification-type.enum';
import { Notification } from 'src/app/models/interfaces/notification.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  readonly ControlType = ControlType;
  @Input() form: Form;
  @Output() notify = new EventEmitter<Notification>();

  ngForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    const group = {} as { [key: string]: unknown[] };
    this.form.controles.forEach((control: FormControl) => {
      group[control.key] = [control.value, control.validators];
    });
    this.ngForm = this.formBuilder.group(group);
  }

  onSubmit() {
    if (this.ngForm?.valid) {
      this.notify.emit({ type: NotificationType.Submit, data: this.ngForm });
    }
  }
}
