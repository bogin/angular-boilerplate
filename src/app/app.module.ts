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
import { UserActionComponent } from './components/user-action/user-action.component';


//services
import { UserActionsService } from './components/user-action/user-action.serivce';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    UserActionComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    TooltipModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserActionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
