import { CellType } from "../enums/board-cell-type.enum";
import { CellState } from "../enums/board-state-type.enum";

export interface BoardCell {
    row: number;
    column: number;
    state: CellState;
    type: CellType;
    value: number;
}
