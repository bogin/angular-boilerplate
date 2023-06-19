import { Routes } from '@angular/router';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { MinesPageComponent } from '../pages/mines-page/mines-page.component';

export const appRoutes: Routes = [
  { 
    path: 'mines',
    component: MinesPageComponent 
  },
  {
    path: '',
    component: HomePageComponent,
  },
];
