import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



import { appRoutes } from './routes/app-routes';
import { AppComponent } from './app.component';




// primeng 
import { TooltipModule } from 'primeng/tooltip';



// components
import { HomePageComponent } from './components/home-page/home-page.component';
import { MinesPageComponent } from './pages/mines-page/mines-page.component';
import { MinesBoardComponent } from './components/mines-board/mines-board.component';
import { UserActionComponent } from './components/user-action/user-action.component';
import { MinesCellComponent } from './components/mines-cell/mines-cell.component';
import { BoardComponent } from './components/board/board.component';
import { FormComponent } from './components/form/form.component';
import { MinesAdminPageComponent } from './pages/mines-admin/mines-admin.component';



//services
import { UserActionService } from './components/user-action/user-action.serivce';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    UserActionComponent,
    MinesPageComponent,
    MinesBoardComponent,
    MinesCellComponent,
    BoardComponent,
    FormComponent,
    MinesAdminPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    TooltipModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserActionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
