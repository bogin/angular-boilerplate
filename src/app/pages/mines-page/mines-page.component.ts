import { Component } from '@angular/core';
import { Board } from 'src/app/models/interfaces/board.model';
import { Notification } from 'src/app/models/interfaces/notification.model';
import { NotificationType } from 'src/app/models/enums/notification-type.enum';
import { BoardCell } from 'src/app/models/interfaces/board-cell.model';
import { CellState } from 'src/app/models/enums/board-state-type.enum';
import { cloneDeep } from 'lodash';
import { MinesPageService } from './mines-page.serivce';
import { MinesPage } from 'src/app/models/interfaces/mines-page-configurations.model';
import { MinesConfigService } from 'src/app/components/configurations-views/mines/mines-config.serivce';

@Component({
  selector: 'app-mines-page',
  templateUrl: './mines-page.component.html',
  styleUrls: ['./mines-page.component.scss'],
})
export class MinesPageComponent {
  board?: Board;
  gameEnded?: boolean;
  configurations: MinesPage;

  constructor(
    private minesPageService: MinesPageService,
    private minesConfigService: MinesConfigService
  ) {}

  ngOnInit() {
    this.minesConfigService
      .getMinesConfiurations()
      .subscribe((res: unknown) => {
        if (res) {
          this.initConfigurations(res as { data: Board });
          this.initPage();
        }
      });
  }

  private initConfigurations = (res: { data: Board }) => {
    this.configurations = this.minesPageService.getConfiguraions();
    const boardConfig = res.data;
    boardConfig.markers = 0;
    boardConfig.firstClick = true;
    boardConfig.active = true;
    this.configurations.board = boardConfig;
    boardConfig.board_theme = boardConfig.theme?.find((option: { selected: boolean; value: string }) => option.selected)?.value;
  };

  initPage = (): void => {
    this.gameEnded = false;
    this.board = cloneDeep(this.configurations.board);
  };

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
  };

  private updateMarkerCounter = (cell: BoardCell): void => {
    if (cell.state === CellState.Marked) {
      this.board!.markers++;
    } else {
      this.board!.markers--;
    }
  };

  private finishGame = () => {
    this.gameEnded = true;
    this.board!.active = false;
  };
}
