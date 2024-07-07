
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CellType } from 'src/app/models/enums/board-cell-type.enum';
import { CellState } from 'src/app/models/enums/board-state-type.enum';
import { BoardCell } from 'src/app/models/interfaces/board-cell.model';
import { Board } from 'src/app/models/interfaces/board.model';
import { Notification } from 'src/app/models/interfaces/notification.model';
import { NotificationType } from 'src/app/models/enums/notification-type.enum';
import { CellsArray } from 'src/app/classes/cells-array.class';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnChanges {
  @Input() board?: Board;
  @Output() notify = new EventEmitter<Notification>();

  cells: CellsArray;

  constructor() { }

  ngOnChanges(): void {
    if (!!this.board) {
      this.cells = new CellsArray(this.board);
    }
  }

  handleCellNotification = (notification: Notification) => {
    if (!this.isBoardStateClickable()) {
      return;
    }

    this.handleCellClick(notification);

    if (this.board?.active && !this.board?.lose) {
      this.ifPlayerWonEndGame();
    }
  }

  private handleCellClick = (notification: Notification) => {
    const isFirstClick = !!this.board!.firstClick;
    this.board!.firstClick = false;
    let cell = notification.data;
    if (isFirstClick) {
      cell = this.cells.moveBombFromCell(cell);
    }

    switch (notification.type) {
      case NotificationType.ItemClicked: {
        this.cellClicked(cell);
        break;
      }
      case NotificationType.ItemRightClicked: {
        this.cellRightClick(cell);
        this.notify.emit({ type: notification.type, data: cell });
        break;
      }
    }
  }

  private cellRightClick = (cell: BoardCell): void => {
    this.cells.toggleCellMarker(cell.row, cell.column);
  }

  private cellClicked = (cell: BoardCell): void => {

    switch (cell.type) {
      case CellType.Bomb: {
        this.playerFailed(cell)
        break;
      }
      case CellType.Empty: {
        this.cells.showEmptyAdjacentCells(cell);
        break;
      }
      case CellType.Number: {
        this.cells.setState(cell.row, cell.column, CellState.Discovered);
        break;
      }
    }
  }

  private ifPlayerWonEndGame = (): void => {
    const isAllCellDiscovered = this.cells.isAllCellDiscovered();
    if (isAllCellDiscovered) {
      this.board!.lose = false;
      setTimeout(() => {
        this.finishGame();
      });
    }
  }

  private playerFailed = (cell: BoardCell): void => {
    if (!!this.board) {
      this.cells.setState(cell.row, cell.column, CellState.Discovered);
      this.board.lose = true;
      this.finishGame(cell);
    }
  }

  private finishGame = (cell?: BoardCell): void => {
    this.notify.emit({ type: NotificationType.Done });
    this.cells.revealFailedBoard(cell);
  }

  private isBoardStateClickable = (): boolean => {
    return !(!this.board?.active || !!this.board?.lose);
  }
}
