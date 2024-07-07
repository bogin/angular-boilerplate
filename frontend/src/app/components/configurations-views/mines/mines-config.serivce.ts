import { cloneDeep } from 'lodash';
import { Injectable } from '@angular/core';
import { Form } from 'src/app/models/interfaces/form.model';
import { MinesConfigConfigurations } from './configurations/mines-config.configurations';
import { MinesManager } from 'src/app/managers/mines.manager';

@Injectable({
  providedIn: 'root',
})
export class MinesConfigService {
  constructor(private minesManager: MinesManager) {}

  getConfiguraions = (): Form => {
    const config = cloneDeep(MinesConfigConfigurations);
    return config;
  };

  getMinesConfiurations = () => {
    return this.minesManager.getMainsConfig();
  };

  saveConfigurations = (data: { [key: string]: number }) => {
    return this.minesManager.saveConfigurations(data);
  };
}
