import { Component } from '@angular/core';
import { Board } from 'src/app/models/interfaces/board.model';
import { Notification } from 'src/app/models/interfaces/notification.model';
import { NotificationType } from 'src/app/models/enums/notification-type.enum';
import { BoardCell } from 'src/app/models/interfaces/board-cell.model';
import { CellState } from 'src/app/models/enums/board-state-type.enum';
import { cloneDeep } from 'lodash';
import { MinesPageService } from './mines-page.serivce';
import { MinesPage } from 'src/app/models/interfaces/mines-page-configurations.model';

@Component({
  selector: 'app-mines-page',
  templateUrl: './mines-page.component.html',
  styleUrls: ['./mines-page.component.scss']
})
export class MinesPageComponent {
  board?: Board;
  gameEnded?: boolean;
  configurations: MinesPage;
  constructor(private minesPageService: MinesPageService) {}

  ngOnInit() {
    this.initPage();
  }

  initPage = (): void => {
    this.gameEnded = false;
    this.configurations = this.minesPageService.getConfiguraions();
    this.board = cloneDeep(this.configurations.board);
  }

  notificationRecived = (notification: Notification) => {
    switch (notification.type) {
      case NotificationType.Done: {
        this.finishGame();
        break;
      }
      case NotificationType.ItemRightClicked: {
        this.updateMarkerCounter(notification.data);
        break;
      }
    }
  }

  private updateMarkerCounter = (cell: BoardCell): void => {
    if (cell.state === CellState.Marked) {
      this.board!.markers++; 
    } else {
      this.board!.markers--; 
    }
  }

  private finishGame = () => {
    this.gameEnded = true;
    this.board!.active = false;
  }
}
