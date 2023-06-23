import { CellType } from "../models/enums/board-cell-type.enum";
import { CellState } from "../models/enums/board-state-type.enum";
import { BoardCell } from "../models/interfaces/board-cell.model";
import { Board } from "../models/interfaces/board.model";

export class CellsArray {
    private _cells: BoardCell[][];
    public get cells(): BoardCell[][] {
        return this._cells;
    }

    board: Board;

    constructor(board: Board, cellWithoutBomb?: BoardCell) {
        this.board = board;
        this.initCells(cellWithoutBomb);
    }

    initCells = (cellWithBombToRemove?: BoardCell) => {
        this.initEmptyCells();
        this.initCellsWithBombs(cellWithBombToRemove);
        this.initCellsWithValues();
    }

    initEmptyCells = (): void => {
        this._cells = [...Array(this.board.rows)]
            .map((item: any, row: number) => this.initEmptyBoardRow(row, this.board.columns));
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

    initCellsWithBombs = (cellWithoutBomb?: BoardCell): void => {
        let totalMines = this.board.total_bombs;
        while (totalMines > 0) {
            let row = Math.floor(Math.random() * (this.board.rows || 0));
            let column = Math.floor(Math.random() * (this.board.columns || 0));

            if (this.shouldPlaceBomb(row, column, cellWithoutBomb)) {
                this.cells[row][column].type = CellType.Bomb;
                totalMines--;
            }
        }
    }

    private shouldPlaceBomb = (row: number, column: number, cellWithoutBomb?: BoardCell): boolean => {
        const initAfterFirstClick = !!cellWithoutBomb;
        const bombIndexIsEquelToFirstClickIndex = (row === cellWithoutBomb?.row && column === cellWithoutBomb.column);
        return this.cells[row][column].type !== CellType.Bomb
            && (!initAfterFirstClick || !bombIndexIsEquelToFirstClickIndex);
    }

    initCellsWithValues = (): void => {
        for (let row = 0; row < this.cells?.length; row++) {
            for (let column = 0; column < this.cells[row]?.length; column++) {
                let cell = this.cells[row][column];
                if (cell.type !== CellType.Bomb) {
                    this.setNumberOfBombs(cell);
                    this.setCellTypeByValue(cell);
                }
            }
        }
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

    private setCellTypeByValue = (cell: BoardCell): void => {
        cell.type = !cell.value ? CellType.Empty : CellType.Number;
    }

    isAllCellDiscovered = (): boolean => {
        for (let row = 0; row < this.cells?.length; row++) {
            for (let column = 0; column < this.cells[row]?.length; column++) {
                const cell = this.cells[row][column];
                const isMarkedWrong = cell.state === CellState.Marked &&
                    [CellType.Empty, CellType.Number].includes(cell.type)

                if (isMarkedWrong || cell.state === CellState.UnDiscovered) {
                    return false;
                }
            }
        }

        return true;

    }

    getCell = (row: number, column: number): BoardCell => {
        return this.cells[row][column];
    }


    getRow = (row: number): BoardCell[] => {
        return this.cells[row];
    }

    toggleCellMarker = (row: number, column: number): void => {
        const cell = this.cells[row][column];
        cell.state === CellState.Marked ?
            cell.state = CellState.UnDiscovered
            : cell.state = CellState.Marked;
    }

    setState = (row: number, column: number, state: CellState): void => {
        this.cells[row][column].state = state;
    }

    setError = (row: number, column: number, error: boolean): void => {
        this.cells[row][column].error = error;
    }

    moveBombFromCell = (cell: BoardCell): BoardCell => {
        this.initCells(cell);
        return this.getCell(cell.row, cell.column);
    }

    showEmptyAdjacentCells = (cell: BoardCell): void => {
        if (cell.type !== CellType.Empty || cell.state === CellState.Discovered) {
            if (cell.type === CellType.Number) {
                this.setState(cell.row, cell.column, CellState.Discovered);
            }
            return;
        }
        this.setState(cell.row, cell.column, CellState.Discovered);
        for (let row = cell.row - 1; row < cell.row + 2; row++) {
            for (let column = cell.column - 1; column < cell.column + 2; column++) {
                const isIndexesInRange = row > -1 && column > -1 && row < this.board!.rows && column < this.board!.columns;
                if (isIndexesInRange) {
                    this.showEmptyAdjacentCells(this.getCell(row, column));
                }
            }
        }
    }

    revealFailedBoard = (cell: BoardCell | undefined) => {
        for (let row = 0; row < this.board!.rows; row++) {
            for (let column = 0; column < this.board!.columns; column++) {
                const isCellIndex = !!cell && (row === cell?.row && column === cell.column);
                if (!isCellIndex) {
                    this.setState(row, column, CellState.Discovered);
                } else {
                    this.setError(row, column, true);
                }
            }
        }
    }
}