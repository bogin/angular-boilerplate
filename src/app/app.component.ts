import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Config } from './configurations/app.configurations';
import { TopbarItem } from './models/interfaces/topbar-item.model';
import { MinesConfigService } from './components/configurations-views/mines/mines-config.serivce';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  topbar: TopbarItem[];
  constructor(
    private translate: TranslateService,
    private minesConfigService: MinesConfigService
  ) {
    translate.setDefaultLang(Config.default_language);
    translate.use(Config.default_language);
  }

  ngOnInit() {
    this.topbar = Config.topbar;
    this.minesConfigService
      .getMinesConfiurations()
      .subscribe((res: { success: boolean; data: { [key: string]: any } }) => {
        const selectedLanguage = res?.data?.languages?.find(
          (lang: { selected: boolean }) => lang.selected
        )?.value;
        this.translate.setDefaultLang(selectedLanguage || Config.default_language);
        this.translate.use(selectedLanguage || Config.default_language);
      });
  }
}
