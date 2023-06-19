import { Routes } from '@angular/router';
import { HomePageComponent } from '../components/home-page/home-page.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  // {path: '/new_page', component: HeroesListComponent},
];
