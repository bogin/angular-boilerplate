import { cloneDeep, merge } from 'lodash';
import { UserActionConfigurations } from './configurations/user-action.configurations';
import { UserAction } from 'src/app/models/interfaces/user-action.model';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserActionsService {

    getConfiguraions = (config?: UserAction): UserAction | undefined => {
        if (!config) {
            return;
        }

        const defualtConfig = cloneDeep(UserActionConfigurations[config.type])
        return merge(config, defualtConfig);
    }
}