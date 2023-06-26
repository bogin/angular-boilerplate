import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { validInteger } from 'src/app/form-validaors/integer.validator';
import { ControlType } from 'src/app/models/enums/control-type.enum';
import { Form, FormControl } from 'src/app/models/interfaces/form.model';
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
    this.minesConfigService.getMinesConfiurations().subscribe((res: any) => {
      this.configForm = this.minesConfigService.getConfiguraions();
      if (!!res?.data) {
        this.setFormValues(res.data);
      }
    });
    
  }

  submit = (notification: Notification) => {
    const controls = notification.data.controls;
    const newConfigurations = {} as any;
    Object.keys(controls).forEach((controlKey: string) => {
      newConfigurations[controlKey] = controls[controlKey].value;
    });
    this.minesConfigService.saveConfigurations(newConfigurations).subscribe((res: any) => {
      this.setFormValues(notification.data);
    });
    /* TODO 
          1. SAVE RESALTS TO SERVER.
          2. CHANGE CONFIG FOR MINES.
          3. IN MINES - GET CONFIG FROM SERVER
          4. IN MINERS GET TOTAL WIN/LOSS 
          5. ADD SCORE BOARD (PRIMENG/CHETGPT)
          6. ADD CLOCK TO MINES
          7. Maybe change the css for the real game 
    
    
    */
  }

  private setFormValues = (baseConfig: any) => {
    Object.keys(baseConfig).forEach((key: string) => {
      const control = this.configForm.controles.find((fContol: FormControl) => fContol.key === key);
      if (!!control) {
        control.value = baseConfig[key];
      }
    });
  }
}
