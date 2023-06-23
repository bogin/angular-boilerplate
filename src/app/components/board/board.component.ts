
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
      cell = this.moveBombFromCell(cell);
    }

    switch (notification.type) {
      case NotificationType.ItemClicked: {
        this.cellClicked(cell);
        break;
      }
      case NotificationType.ItemRightClicked: {
        this.handleCellRightClick(cell);
        this.notify.emit({ type: notification.type, data: cell });
        break;
      }
    }
  }

  private handleCellRightClick = (cell: BoardCell): void => {
    this.cells.toggleCellMarker(cell.row, cell.column);
  }

  private moveBombFromCell = (cell: BoardCell): BoardCell => {
    this.cells.initCells(cell);
    return this.cells.getCell(cell.row, cell.column);
  }

  private cellClicked = (cell: BoardCell): void => {

    switch (cell.type) {
      case CellType.Bomb: {
        this.playerFailed(cell)
        break;
      }
      case CellType.Empty: {
        this.showEmptyAdjacentCells(cell);
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
    this.showFailedBoard(cell);
  }

  private showEmptyAdjacentCells = (cell: BoardCell): void => {
    if (cell.type !== CellType.Empty || cell.state === CellState.Discovered) {
      if (cell.type === CellType.Number) {
        this.cells.setState(cell.row, cell.column, CellState.Discovered);
      }
      return;
    }
    this.cells.setState(cell.row, cell.column, CellState.Discovered);
    for (let row = cell.row - 1; row < cell.row + 2; row++) {
      for (let column = cell.column - 1; column < cell.column + 2; column++) {
        const isIndexesInRange = row > -1 && column > -1 && row < this.board!.rows && column < this.board!.columns;
        if (isIndexesInRange) {
          this.showEmptyAdjacentCells(this.cells.getCell(row, column));
        }
      }
    }
  }

  private showFailedBoard = (cell: BoardCell | undefined) => {
    for (let row = 0; row < this.board!.rows; row++) {
      for (let column = 0; column < this.board!.columns; column++) {
        const isCellIndex = !!cell && (row === cell?.row && column === cell.column);
        if (!isCellIndex) {
          this.cells.setState(row, column, CellState.Discovered);
        } else {
          this.cells.setError(row, column, true);
        }
      }
    }
  }

  private isBoardStateClickable = (): boolean => {
    return !(!this.board?.active || !!this.board?.lose);
  }
}
