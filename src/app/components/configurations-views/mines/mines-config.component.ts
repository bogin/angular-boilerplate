import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { validInteger } from 'src/app/form-validaors/integer.validator';
import { ControlType } from 'src/app/models/enums/control-type.enum';
import { Form } from 'src/app/models/interfaces/form.model';
import { MinesConfigService } from './mines-config.serivce';
import { Notification } from 'src/app/models/interfaces/notification.model';

@Component({
  selector: 'app-mines-config',
  templateUrl: './mines-config.component.html',
  styleUrls: ['./mines-config.component.scss']
})
export class MinesConfigurationComponent {

  configForm: Form;

  constructor(private minesConfigService: MinesConfigService) { }

  ngOnInit() {
    this.configForm = this.minesConfigService.getConfiguraions();
  }

  submit = (notification: Notification) => {
    
  }
}
