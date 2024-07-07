// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Array<T> {
    getIndexesValueOrUndefined(array: T[][], row: number, column: number): T | undefined;
}

Array.prototype.getIndexesValueOrUndefined = (array: unknown[][], row: number, column: number): unknown | undefined => {
    if (row > -1 && column > -1) {
        if (row < array.length && column < array[row].length) {
            return array[row][column];
        }
    }

    return undefined;
}