import { cloneDeep } from 'lodash';
import { Injectable } from '@angular/core';
import { MinesPageConfigurations } from './configurations/mines-page.configurations';
import { MinesPage } from 'src/app/models/interfaces/mines-page-configurations.model';

@Injectable({
    providedIn: 'root'
})
export class MinesPageService {
    getConfiguraions = (): MinesPage => {
        return cloneDeep(MinesPageConfigurations);
    }
}