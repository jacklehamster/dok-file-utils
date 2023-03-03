export class ImageLoader {
    constructor(preserve: any, XMLHttpRequest: any, Image: any);
    preserve: any;
    XMLHttpRequest: any;
    Image: any;
    imageStock: {};
    getBlobUrl(url: any, forcePreserve?: boolean): Promise<any>;
    preloadImages(...urls: any[]): Promise<any[]>;
    loadImage(url: any): Promise<any>;
}
