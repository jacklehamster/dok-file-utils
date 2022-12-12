export class FileUtils {
    constructor(XMLHttpRequest: any);
    XMLHttpRequest: any;
    fileStock: {};
    setOverride(override: any): void;
    override: any;
    preload(...urls: any[]): Promise<any[]>;
    load(url: any, responseType: any): Promise<any>;
}
