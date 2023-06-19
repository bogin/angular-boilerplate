import { Component, Input, OnInit } from '@angular/core';
import { UserAction } from 'src/app/models/interfaces/user-action.model';
import { UserActionsService } from './user-action.serivce';

@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.scss']
})
export class UserActionComponent implements OnInit {
  @Input() config?: UserAction;

  constructor(private userActionsService: UserActionsService) {

  }

  ngOnInit(): void {
    this.config = this.userActionsService.getConfiguraions(this.config);
  }
}
