export class ImageLoader {
    constructor(preserve: any, XMLHttpRequest: any, Image: any);
    preserve: any;
    XMLHttpRequest: any;
    Image: any;
    imageStock: {};
    getBlobUrl(url: any): Promise<any>;
    preloadImages(...urls: any[]): Promise<any[]>;
    loadImage(url: any): Promise<any>;
}
