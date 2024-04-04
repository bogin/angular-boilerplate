import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Config } from './configurations/app.configurations';
import { TopbarItem } from './models/interfaces/topbar-item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  topbar: TopbarItem[];
  constructor(private translate: TranslateService) {
    translate.setDefaultLang(Config.default_language);
    translate.use(Config.default_language);
  }

  ngOnInit() {
    this.topbar = Config.topbar;
  }
}
