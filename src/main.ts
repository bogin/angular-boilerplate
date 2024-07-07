import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import '../src/app/utils/array.extensions';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
