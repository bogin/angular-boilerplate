import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validInteger } from '../../form-validaors/integer.validator'
import { Board } from 'src/app/models/interfaces/board.model';
import { Notification } from 'src/app/models/interfaces/notification.model';
import { NotificationType } from 'src/app/models/enums/notification-type.enum';

@Component({
  selector: 'app-mines-page',
  templateUrl: './mines-page.component.html',
  styleUrls: ['./mines-page.component.scss']
})
export class MinesPageComponent {
  boardForm: FormGroup;
  showBoard: boolean;
  board: Board;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.boardForm = this.formBuilder.group({
      boardSize: ['', [Validators.required, Validators.min(1), validInteger()]],
      totalBombs: ['', [Validators.required, Validators.min(1), validInteger()]]
    });

    this.showBoard = true;
    this.board = {
      size: 10,
      total_bombs: 30
    }
  }

  onSubmit() {
    if (this.boardForm?.valid) {
      this.initBoard();
    }
  }

  private initBoard = () => {
    this.showBoard = false;
    this.board = {
      size: this.boardForm.value.boardSize,
      total_bombs: this.boardForm.value.totalBombs
    };
    this.showBoard = true;
  }

  notificationRecived = (notificatin: Notification) => {
    switch (notificatin.type) {
      case NotificationType.Done: {
        this.finishGame(notificatin.data.board.lose);
        break;
      }
    }
  }

  private finishGame = (lose: boolean) => {
    lose ? alert('you lose') : alert('you win');
    this.initBoard();
  }
}
