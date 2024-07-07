export class Text {
    key: string;
    params?: unknown;
   
    constructor (key: string, params?: unknown) {
        this.key = key;
        this.params = params;
    }
}