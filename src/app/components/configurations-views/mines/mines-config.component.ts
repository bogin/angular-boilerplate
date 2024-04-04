import { Component } from '@angular/core';
import { Form, FormControl } from 'src/app/models/interfaces/form.model';
import { MinesConfigService } from './mines-config.serivce';
import { Notification } from 'src/app/models/interfaces/notification.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mines-config',
  templateUrl: './mines-config.component.html',
  styleUrls: ['./mines-config.component.scss']
})
export class MinesConfigurationComponent {

  configForm: Form;

  constructor(
    private messageService: MessageService,
    private minesConfigService: MinesConfigService,
  ) { }

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
      newConfigurations[controlKey] = Number(controls[controlKey].value);
    });
    this.minesConfigService.saveConfigurations(newConfigurations).subscribe((res: any) => {
      if (!!res?.success) {
        this.messageService.add(this.configForm.notification_messages?.success!);
        this.setFormValues(notification.data);
      } else {
        this.messageService.add(this.configForm.notification_messages?.failure!);
      }
    });
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
