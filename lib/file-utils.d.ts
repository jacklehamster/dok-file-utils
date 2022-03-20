export class FileUtils {
    constructor(XMLHttpRequest: any);
    XMLHttpRequest: any;
    fileStock: {};
    preload(...urls: any[]): Promise<any[]>;
    load(url: any, responseType: any): Promise<any>;
}
