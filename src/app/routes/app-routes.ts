import { Routes } from '@angular/router';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { MinesPageComponent } from '../pages/mines-page/mines-page.component';
import { ConfigurationsPageComponent } from '../pages/configurations-page/configurations-page.component';
import { MinesConfigurationComponent } from '../components/configurations-views/mines/mines-config.component';

export const appRoutes: Routes = [
  {
    path: 'configurations',
    component: ConfigurationsPageComponent,
    children: [{
        path: 'mines-configurations',
        component: MinesConfigurationComponent
      }]
  },
  {
    path: '',
    component: HomePageComponent,
  },
];
