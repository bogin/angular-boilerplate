import { Component } from '@angular/core';
import { Form, FormControl } from 'src/app/models/interfaces/form.model';
import { MinesConfigService } from './mines-config.serivce';
import { Notification } from 'src/app/models/interfaces/notification.model';
import { MessageService } from 'primeng/api';
import { ControlType } from 'src/app/models/enums/control-type.enum';

@Component({
  selector: 'app-mines-config',
  templateUrl: './mines-config.component.html',
  styleUrls: ['./mines-config.component.scss'],
})
export class MinesConfigurationComponent {
  configForm: Form;

  constructor(
    private messageService: MessageService,
    private minesConfigService: MinesConfigService
  ) {}

  ngOnInit() {
    this.minesConfigService
      .getMinesConfiurations()
      .subscribe(
        (res: { success: boolean; data: { [key: string]: number } }) => {
          this.configForm = this.minesConfigService.getConfiguraions();
          if (res?.data) {
            this.setFormValues(res.data);
          }
        }
      );
  }

  submit = (notification: Notification) => {
    const controls = notification.data.controls;
    const newConfigurations = {} as { [key: string]: any };
    Object.keys(controls).forEach((controlKey: string) => {
      const control = this.configForm.controles.find(
        (fContol: FormControl) => fContol.key === controlKey
      );
      switch (control?.type) {
        case ControlType.Input: {
          newConfigurations[controlKey] = Number(control.value);
          break;
        }
        case ControlType.Select: {
          const options = control.options?.map((option: any) => {
            return {
              ...option,
              selected: option.value === controls[controlKey].value?.value,
            };
          });
          newConfigurations[controlKey] = options;
          break;
        }
      }
    });
    this.minesConfigService
      .saveConfigurations(newConfigurations)
      .subscribe((res: { success: boolean }) => {
        if (res?.success) {
          this.messageService.add(
            this.configForm.notification_messages?.success!
          );
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          this.messageService.add(
            this.configForm.notification_messages?.failure!
          );
        }
      });
  };

  private setFormValues = (baseConfig: { [key: string]: any }) => {
    Object.keys(baseConfig).forEach((key: string) => {
      const control = this.configForm.controles.find(
        (fContol: FormControl) => fContol.key === key
      );
      if (control) {
        switch (control.type) {
          case ControlType.Input: {
            control.value = baseConfig[key];
            break;
          }
          case ControlType.Select: {
            control.options = baseConfig[key];
            control.value = baseConfig[key]?.find(
              (option: { selected: boolean }) => option.selected
            );
            break;
          }
        }
      }
    });
  };
}
