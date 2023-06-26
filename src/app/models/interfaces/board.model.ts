export interface Board {
    rows?: number;
    columns?: number;
    total_bombs?: number;
    markers: number;
    firstClick: boolean;
    cells_size?: number;
    cells_gap?: number;
    lose?: boolean;
    active?: boolean;
}