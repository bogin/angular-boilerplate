import { cloneDeep } from 'lodash';
import { Injectable } from '@angular/core';
import { Form } from 'src/app/models/interfaces/form.model';
import { MinesConfigConfigurations } from './configurations/mines-config.configurations';

@Injectable({
    providedIn: 'root'
})
export class MinesConfigService {

    getConfiguraions = (): Form => {
        return cloneDeep(MinesConfigConfigurations);
    }
}