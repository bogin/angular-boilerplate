import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CellType } from 'src/app/models/enums/board-cell-type.enum';
import { CellState } from 'src/app/models/enums/board-state-type.enum';
import { BoardCell } from 'src/app/models/interfaces/board-cell.model';
import { Board } from 'src/app/models/interfaces/board.model';
import { BoardService } from './board.serivce';
import { Notification } from 'src/app/models/interfaces/notification.model';
import { NotificationType } from 'src/app/models/enums/notification-type.enum';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() board: Board;
  @Output() notify = new EventEmitter<Notification>();

  cells: BoardCell[][];

  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    this.initEmptyBoard();
    this.initBombs();
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
        break;
      }
    }
  }

  private cellClicked = (cell: BoardCell): void => {
    switch (cell.type) {
      case CellType.Bomb: {
        this.playerFailed(cell)
        break;
      }
      case CellType.Number: {
        this.showCellValue(cell);
      }
    }
  }

  private playerFailed = (cell: BoardCell): void => {
   this.showCellValue(cell);
    this.board.lose = true;
    this.notify.emit({ type: NotificationType.Done, data: { board: this.board }})
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

  private initEmptyBoard = () => {
    this.cells = [...Array(this.board.size)]
      .map((item: any, row: number) => this.initEmptyBoardRow(row));
  }

  private initEmptyBoardRow = (row: number) => {
    return [...Array(this.board.size)]
      .map((item: any, column: number) => this.boardService.getEmptyCell(row, column));
  }

  private initBombs = () => {
    let mToLay = this.board.total_bombs;
    while (mToLay > 0) {
      let row = Math.floor(Math.random() * this.board.size);
      let col = Math.floor(Math.random() * this.board.size);
      if (this.cells[row][col].type !== CellType.Bomb) {
        this.cells[row][col].type = CellType.Bomb;
        mToLay--;
      }
    }
  }

  private updateCellsValues = () => {
    for (let row = 0; row < this.board.size; row++) {
      for (let column = 0; column < this.board.size; column++) {
        if (this.cells[row][column].type !== CellType.Bomb) {
          this.cells[row][column].value += this.getValueByIndexes(row - 1, column);
          this.cells[row][column].value += this.getValueByIndexes(row + 1, column);
          this.cells[row][column].value += this.getValueByIndexes(row, column - 1);
          this.cells[row][column].value += this.getValueByIndexes(row, column + 1);
        }
      }
    }
  }

  private getValueByIndexes = (row: number, column: number): number => {
    const cell: BoardCell = this.cells.getIndexesValueOrUndefined(this.cells, row - 1, column);
    if (!!cell && cell.type === CellType.Bomb) {
      return 1;
    }

    return 0;
  }
}
