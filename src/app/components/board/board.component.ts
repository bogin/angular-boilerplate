
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CellType } from 'src/app/models/enums/board-cell-type.enum';
import { CellState } from 'src/app/models/enums/board-state-type.enum';
import { BoardCell } from 'src/app/models/interfaces/board-cell.model';
import { Board } from 'src/app/models/interfaces/board.model';
import { BoardService } from './board.serivce';
import { Notification } from 'src/app/models/interfaces/notification.model';
import { NotificationType } from 'src/app/models/enums/notification-type.enum';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnChanges {
  @Input() board?: Board;
  @Output() notify = new EventEmitter<Notification>();

  cells: BoardCell[][];

  constructor(private boardService: BoardService) { }

  ngOnChanges(): void {
    if (!!this.board) {
      let totalMines = this.board.total_bombs || 0;
      if (totalMines > (this.board.rows * this.board!.columns)) {
        alert('You are using to many bombs');
      } else {
        this.initBoardCells(); 
      }
    }
    
  }

  initBoardCells = (cellWithoutBomb?: BoardCell) => {
    this.cells = this.boardService.initEmptyCells(this.board!);
    this.cells = this.boardService.initCellsWithBombs(this.board!, this.cells, cellWithoutBomb);
    this.cells = this.boardService.initCellsWithValues(this.cells);
  }

  notificationRecived = (notification: Notification) => {
    if (!this.board?.active || !!this.board?.lose) {
      return;
    }

    switch (notification.type) {
      case NotificationType.ItemClicked: {
        this.cellClicked(notification.data);
        break;
      }
      case NotificationType.ItemRightClicked: {
        this.toggleCellMarker(notification.data);
        this.notify.emit(notification)
        break;
      }
    }

    if (this.board?.active && !this.board?.lose) {
      this.ifPlayerWonEndGame();
    }
  }

  private moveBombFromCell = (cell: BoardCell): void => {
    this.initBoardCells(cell);
    this.cellClicked(this.cells[cell.row][cell.column]);
  }

  private cellClicked = (cell: BoardCell): void => {
    const isFirstClick = !!this.board?.firstClick;
    this.board!.firstClick = false;
    switch (cell.type) {
      case CellType.Bomb: {
        if (isFirstClick) {
          this.moveBombFromCell(cell);
        } else {
          this.playerFailed(cell)
        }
        break;
      }
      case CellType.Empty: {
        this.showEmptyCells(cell);
        break;
      }
      case CellType.Number: {
        this.showCellValue(cell);
        break;
      }
    }
  }

  private ifPlayerWonEndGame = (): void => {
    const isAllCellDiscovered = this.boardService.isAllCellDiscovered(this.cells);
    if (isAllCellDiscovered) {
      this.board!.lose = false;
      setTimeout(() => {
        this.finishGame();
      });
    }
  }

  private playerFailed = (cell: BoardCell): void => {
    if (!!this.board) {
      this.showCellValue(cell);
      this.board.lose = true;
      this.finishGame(cell);
    }
  }

  private finishGame = (cell?: BoardCell): void => {
    this.notify.emit({ type: NotificationType.Done });
    this.showFailedBoard(cell);
  }

  private toggleCellMarker = (cell: BoardCell): void => {
    const cellFromMemomry = this.cells[cell.row][cell.column];
    cellFromMemomry.state === CellState.Marked ?
      cellFromMemomry.state = CellState.UnDiscovered
      : cellFromMemomry.state = CellState.Marked;
  }

  private showCellValue = (cell: BoardCell): void => {
    const cellFromMemomry = this.cells[cell.row][cell.column];
    cellFromMemomry.state = CellState.Discovered;
  }

  private showEmptyCells = (cell: BoardCell): void => {
    if (cell.type !== CellType.Empty || cell.state === CellState.Discovered) {
      if (cell.type === CellType.Number) {
        cell.state = CellState.Discovered;
      }
      return;
    }
    cell.state = CellState.Discovered;
    for (let row = cell.row - 1; row < cell.row + 2; row++) {
      for (let column = cell.column - 1; column < cell.column + 2; column++) {
        const isIndexesInRange = row > -1 && column > -1 && row < this.cells.length && column < this.cells[row].length;
        if (isIndexesInRange) {
          this.showEmptyCells(this.cells[row][column]);
        }
      }
    }
  }

  private showFailedBoard = (cell: BoardCell | undefined) => {
    for (let row = 0; row < this.cells?.length; row++) {
      for (let column = 0; column < this.cells[row]?.length; column++) {
        const isCellIndex = !!cell && (row === cell?.row && column === cell.column);
        if (!isCellIndex) {
          this.cells[row][column].state = CellState.Discovered;
        } else {
          this.cells[row][column].error = true;
        }
      }
    }
  }
}
