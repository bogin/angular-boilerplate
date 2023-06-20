interface Array<T> {
    getIndexesValueOrUndefined(array: any[][], row: number, column: number): any | undefined;
}

Array.prototype.getIndexesValueOrUndefined = (array: any[][], row: number, column: number): any | undefined => {
    if (row > -1 && column > -1) {
        if (row < array.length && column < array[row].length) {
            return array[row][column];
        }
    }

    return undefined;
}