export interface Board {
    size: number;
    total_bombs: number;
    markers: number;
    firstClick: boolean;
    lose?: boolean;
}