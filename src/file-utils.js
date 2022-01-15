class FileUtils {
    constructor(XMLHttpRequest) {
        this.XMLHttpRequest = XMLHttpRequest || globalThis.XMLHttpRequest;
        this.fileStock = {};
    }

    async preload(...urls) {
        return Promise.all(urls.map(async url => {
            return await this.load(url);
        }));
    }

    async load(url, responseType) {
        return !url ? Promise.resolve(null) : new Promise((resolve, reject) => {
            if (this.fileStock[url]) {
                const { data, loaded, onLoadListeners } = this.fileStock[url];
                if (!loaded) {
                    onLoadListeners.push(resolve);
                } else {
                    resolve(data);
                }
            } else {
                const req = new this.XMLHttpRequest();
                this.fileStock[url] = {
                    data: null,
                    url,
                    progress: 0,
                    onLoadListeners: [],
                };
                req.open('GET', url);
                req.responseType = responseType || (url.match(/.(json)$/i) ? "json" : 'blob');

                req.addEventListener('load', e => {
                    if (req.status === 200) {
                        const data = req.response;
                        this.fileStock[url].progress = 1;
                        this.fileStock[url].loaded = true;
                        this.fileStock[url].data = data;
                        this.fileStock[url].onLoadListeners.forEach(callback => callback(data));
                        delete this.fileStock[url].onLoadListeners;
                        resolve(data);
                    }
                    else {
                        reject(new Error(`Url could not load: ${url}`));
                    }
                });
                req.addEventListener('error', e => {
                    reject(new Error("Network Error"));
                });
                req.addEventListener('progress', e => {
                    this.fileStock[url].progress = e.loaded / e.total;
                });
                req.send();
            }
        });
    }
}

if (typeof module !== "undefined") {
    module.exports = {
        FileUtils,
    };
}
