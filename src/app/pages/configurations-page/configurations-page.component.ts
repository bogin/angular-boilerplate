import { OnInit, Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ConfigurationPageSevice } from './configurations.serivce';

@Component({
  selector: 'app-configurations-page',
  templateUrl: './configurations-page.component.html',
  styleUrls: ['./configurations-page.component.scss']
})
export class ConfigurationsPageComponent implements OnInit {
  menuItems: MenuItem[];

  constructor(private configurationPageSevice: ConfigurationPageSevice) {}

  ngOnInit() {
    this.menuItems = this.configurationPageSevice.getConfiguraions().menu_items;
  }
}
