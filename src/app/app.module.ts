import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// primeng 
import { TooltipModule } from 'primeng/tooltip';


import { appRoutes } from './routes/app-routes';
import { AppComponent } from './app.component';

// components
import { HomePageComponent } from './components/home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { UserActionComponent } from './components/user-action/user-action.component';
import { UserActionsService as UserActionService } from './components/user-action/user-action.serivce';
import { MinesPageComponent } from './pages/mines-page/mines-page.component';
import { MinesBoardComponent } from './components/mines-board/mines-board.component';
import { MinesCellComponent } from './components/mines-cell/mines-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    UserActionComponent,
    MinesPageComponent,
    MinesBoardComponent,
    MinesCellComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    TooltipModule
  ],
  providers: [UserActionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
