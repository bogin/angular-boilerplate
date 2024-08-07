import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// translate
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoaderFactory } from './factories/translate-http-loader.factory';


// main 
import { appRoutes } from './routes/app-routes';
import { AppComponent } from './app.component';


// primeng 
import { TooltipModule } from 'primeng/tooltip';
import { SidebarModule } from 'primeng/sidebar';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { DropdownModule } from 'primeng/dropdown';

//services
import { ConfigurationsPageComponent } from './pages/configurations-page/configurations-page.component';
import { MinesConfigurationComponent } from './components/configurations-views/mines/mines-config.component';


// components
import { HomePageComponent } from './components/home-page/home-page.component';
import { MinesPageComponent } from './pages/mines-page/mines-page.component';

import { MinesCellComponent } from './components/mines-cell/mines-cell.component';
import { BoardComponent } from './components/board/board.component';
import { FormComponent } from './components/form/form.component';
import { MessageService } from 'primeng/api';

//pipes

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MinesPageComponent,
    MinesCellComponent,
    BoardComponent,
    FormComponent,
    ConfigurationsPageComponent,
    MinesConfigurationComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    TooltipModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarModule,
    MenubarModule,
    PanelMenuModule,
    HttpClientModule,
    ToastModule,
    HttpClientModule,
    MessagesModule,
    DropdownModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
