export interface Board {
    rows: number;
    columns: number;
    total_bombs: number;
    markers: number;
    firstClick: boolean;
    cell_size: number;
    cell_gap: number;
    lose?: boolean;
    active?: boolean;
}