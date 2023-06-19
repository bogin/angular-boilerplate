export class Text {
    key: string;
    needsTranslation?: boolean;
    params?: any[];
    constructor (key: string, needsTranslation?: boolean, params?: any[]) {
        this.key = key;
        this.needsTranslation = needsTranslation;
        this.params = params;
    }
}