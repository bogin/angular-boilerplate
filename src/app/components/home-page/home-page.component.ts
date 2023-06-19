import { Component } from '@angular/core';
import { UserActionType } from 'src/app/models/enums/user-action-type.enum';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  readonly UserActionType = UserActionType;
}
