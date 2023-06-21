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
    this.initBoardCells();
  }

  initBoardCells = (cellWithoutBomb?: BoardCell) => {
    this.initEmptyCells();
    this.initBombs(cellWithoutBomb);
    this.updateCellsValues();
  }

  notificationRecived = (notification: Notification) => {
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
    setTimeout(() => {
      this.ifPlayerWonEndGame();
    });
  }

  private moveBombFromCell = (cell: BoardCell): void => {
    this.initBoardCells(cell);
    this.cellClicked(cell);
  }

  private cellClicked = (cell: BoardCell): void => {
    switch (cell.type) {
      case CellType.Bomb: {
        if (!!this.board?.firstClick) {
          this.board.firstClick = false;
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
    for (let row = 0; row < this.cells?.length; row++) {
      for (let column = 0; column < this.cells[row]?.length; column++) {
        const cell = this.cells[row][column];
        if (cell.state === CellState.UnDiscovered) {
          return;
        }
      }
    }

    this.board!.lose = false;
    setTimeout(() => {
      this.notify.emit({ type: NotificationType.Done, data: { board: this.board } })
    });
  }

  private playerFailed = (cell: BoardCell): void => {
    if (!!this.board) {
      this.showCellValue(cell);
      this.board.lose = true;
      setTimeout(() => {
        this.notify.emit({ type: NotificationType.Done })
      }, 10);
    }
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

  private initEmptyCells = () => {
    this.cells = [...Array(this.board?.size)]
      .map((item: any, row: number) => this.initEmptyBoardRow(row));
  }

  private initEmptyBoardRow = (row: number) => {
    return [...Array(this.board?.size)]
      .map((item: any, column: number) => this.boardService.getEmptyCell(row, column));
  }

  private initBombs = (cellWithoutBomb?: BoardCell) => {
    let totalMines = this.board?.total_bombs || 0;
    while (totalMines > 0) {
      let row = Math.floor(Math.random() * (this.board?.size || 0));
      let column = Math.floor(Math.random() * (this.board?.size || 0));

      if (this.shouldPlaceBomb(row, column, cellWithoutBomb)) {
        this.cells[row][column].type = CellType.Bomb;
        totalMines--;
      }
    }
  }

  private updateCellsValues = () => {
    for (let row = 0; row < this.cells?.length; row++) {
      for (let column = 0; column < this.cells[row]?.length; column++) {
        const cell = this.cells[row][column];
        if (cell.type !== CellType.Bomb) {
          this.setNumberOfBombs(cell);
          this.setCellTypeByValue(cell);
        }
      }
    }
  }

  private setCellTypeByValue = (cell: BoardCell): void => {
    cell.type = !cell.value ? CellType.Empty : CellType.Number;
  }

  private setNumberOfBombs = (cell: BoardCell): void => {
    for (let row = cell.row - 1; row < cell.row + 2; row++) {
      for (let column = cell.column - 1; column < cell.column + 2; column++) {
        const isIndexesInRange = row > -1 && column > -1 && row < this.cells.length && column < this.cells[row].length;
        if (isIndexesInRange) {
          if (this.cells[row][column].type === CellType.Bomb) {
            cell.value++;
          }
        }
      }
    }
  }

  private shouldPlaceBomb = (row: number, column: number, cellWithoutBomb?: BoardCell): boolean => {
    const initAfterFirstClick = !!cellWithoutBomb;
    const bombIndexIsEquelToFirstClickIndex = (row === cellWithoutBomb?.row && column === cellWithoutBomb.column);
    return this.cells[row][column].type !== CellType.Bomb
      && (!initAfterFirstClick || !bombIndexIsEquelToFirstClickIndex)
  }
}
