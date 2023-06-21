export interface Board {
    rows: number;
    columns: number;
    total_bombs: number;
    markers: number;
    firstClick: boolean;
    lose?: boolean;
    active?: boolean;
}