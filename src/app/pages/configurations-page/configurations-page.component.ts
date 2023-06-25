import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-configurations-page',
  templateUrl: './configurations-page.component.html',
  styleUrls: ['./configurations-page.component.scss']
})
export class ConfigurationsPageComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Mines Configurations',
      routerLink: 'mines-configurations',
      icon: 'fa-solid fa-screwdriver-wrench',
      // target: "_self",
      // command: (event) => {
      //   this.navigateTo('r');
      // }
    }
  ];

  constructor(private router: Router) {}

  navigateTo = (route: string): void => {
    this.router.navigateByUrl('configurations/mines');
  }
}
