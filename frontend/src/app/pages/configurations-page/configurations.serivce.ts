import { cloneDeep } from 'lodash';
import { Injectable } from '@angular/core';
import { ConfigurationsPage } from './configurations/configurations-page.configurations';

@Injectable({
    providedIn: 'root'
})
export class ConfigurationPageSevice {

    getConfiguraions = () => {
        return cloneDeep(ConfigurationsPage);
    }
}