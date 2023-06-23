
import { Injectable } from '@angular/core';
import { CellType } from 'src/app/models/enums/board-cell-type.enum';
import { CellState } from 'src/app/models/enums/board-state-type.enum';
import { BoardCell } from 'src/app/models/interfaces/board-cell.model';
import { Board } from 'src/app/models/interfaces/board.model';

@Injectable({
    providedIn: 'root'
})
export class BoardService {

    initEmptyCells = (board: Board): BoardCell[][] => {
        return [...Array(board.rows)]
            .map((item: any, row: number) => this.initEmptyBoardRow(row, board.columns));
    }

    private initEmptyBoardRow = (row: number, columnSize: number) => {
        return [...Array(columnSize)]
            .map((item: any, column: number) => this.getEmptyCell(row, column));
    }

    private getEmptyCell = (row: number, column: number): BoardCell => {
        return {
            row,
            column,
            state: CellState.UnDiscovered,
            type: CellType.Empty,
            value: 0
        };
    }

    initCellsWithBombs = (board: Board, cells: BoardCell[][], cellWithoutBomb?: BoardCell): BoardCell[][] => {
        let totalMines = board.total_bombs;
        while (totalMines > 0) {
            let row = Math.floor(Math.random() * (board.rows || 0));
            let column = Math.floor(Math.random() * (board.columns || 0));

            if (this.shouldPlaceBomb(row, column, cells, cellWithoutBomb)) {
                cells[row][column].type = CellType.Bomb;
                totalMines--;
            }
        }

        return cells;
    }

    private shouldPlaceBomb = (row: number, column: number, cells: BoardCell[][], cellWithoutBomb?: BoardCell): boolean => {
        const initAfterFirstClick = !!cellWithoutBomb;
        const bombIndexIsEquelToFirstClickIndex = (row === cellWithoutBomb?.row && column === cellWithoutBomb.column);
        return cells[row][column].type !== CellType.Bomb
            && (!initAfterFirstClick || !bombIndexIsEquelToFirstClickIndex)
    }

    initCellsWithValues = (cells: BoardCell[][]): BoardCell[][] => {
        for (let row = 0; row < cells?.length; row++) {
            for (let column = 0; column < cells[row]?.length; column++) {
                let cell = cells[row][column];
                if (cell.type !== CellType.Bomb) {
                    cell = this.setNumberOfBombs(cell, cells);
                    cell = this.setCellTypeByValue(cell);
                }
            }
        }

        return cells;
    }

    private setNumberOfBombs = (cell: BoardCell, cells: BoardCell[][]): BoardCell => {
        for (let row = cell.row - 1; row < cell.row + 2; row++) {
            for (let column = cell.column - 1; column < cell.column + 2; column++) {
                const isIndexesInRange = row > -1 && column > -1 && row < cells.length && column < cells[row].length;
                if (isIndexesInRange) {
                    if (cells[row][column].type === CellType.Bomb) {
                        cell.value++;
                    }
                }
            }
        }

        return cell;
    }

    private setCellTypeByValue = (cell: BoardCell): BoardCell => {
        cell.type = !cell.value ? CellType.Empty : CellType.Number;
        return cell;
    }

    isAllCellDiscovered = (cells: BoardCell[][]): boolean => {
        for (let row = 0; row < cells?.length; row++) {
            for (let column = 0; column < cells[row]?.length; column++) {
                const cell = cells[row][column];
                const isMarkedWrong =  cell.state === CellState.Marked &&
                    [CellType.Empty, CellType.Number].includes(cell.type)
                
                if (isMarkedWrong || cell.state === CellState.UnDiscovered) {
                    return false;
                }
            }
        }

        return true;

    }
}