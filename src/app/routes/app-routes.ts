import { Routes } from '@angular/router';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { MinesPageComponent } from '../pages/mines-page/mines-page.component';
import { MinesAdminPageComponent } from '../pages/mines-admin/mines-admin.component';

export const appRoutes: Routes = [
  { 
    path: 'mines',
    component: MinesPageComponent 
  },
  { 
    path: 'mines-config',
    component: MinesAdminPageComponent 
  },
  {
    path: '',
    component: HomePageComponent,
  },
];
