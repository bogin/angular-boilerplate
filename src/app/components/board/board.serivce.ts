
import { Injectable } from '@angular/core';
import { CellType } from 'src/app/models/enums/board-cell-type.enum';
import { CellState } from 'src/app/models/enums/board-state-type.enum';
import { BoardCell } from 'src/app/models/interfaces/board-cell.model';

@Injectable({
    providedIn: 'root'
})
export class BoardService {

    getEmptyCell = (row: number, column: number): BoardCell => {
        return {
            row,
            column,
            state: CellState.UnDiscovered,
            type: CellType.Empty,
            value: 0
        };
    }
}