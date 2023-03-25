class FileUtils {
    constructor(XMLHttpRequest) {
        this.XMLHttpRequest = XMLHttpRequest || globalThis.XMLHttpRequest;
        this.fileStock = {};
        this.override = null;
        this.extensionProcessors = {};
    }

    setOverride(override) {
        this.override = override;
    }

    addExtensionProcessor(extension, processor) {
        this.extensionProcessors[extension] = processor;
    }

    async preload(...urls) {
        return Promise.all(urls.map(async url => {
            return await this.load(url);
        }));
    }

    async load(url, responseType) {
        if (this.override?.[url]) {
            return this.override?.[url];
        }
        return !url ? Promise.resolve(null) : new Promise((resolve, reject) => {
            const extension = url.split(".").pop();
            const extensionProcessor = this.extensionProcessors[extension];
            const realResponseType = responseType ?? extensionProcessor?.responseType ?? (url.match(/.(json)$/i) ? "json" : 'blob');
            const tag = [url, realResponseType].join("|");
            if (this.fileStock[tag]) {
                const { data, loaded, onLoadListeners } = this.fileStock[tag];
                if (!loaded) {
                    onLoadListeners.push(resolve);
                } else {
                    resolve(data);
                }
            } else {
                const req = new this.XMLHttpRequest();
                this.fileStock[tag] = {
                    data: null,
                    url,
                    progress: 0,
                    onLoadListeners: [],
                };
                req.open('GET', url);
                req.responseType = realResponseType;

                req.addEventListener('load', async (e) => {
                    if (req.status === 200) {
                        const data = extensionProcessor?.process ? await extensionProcessor.process(req.response) : req.response;
                        this.fileStock[tag].progress = 1;
                        this.fileStock[tag].loaded = true;
                        this.fileStock[tag].data = data;
                        this.fileStock[tag].onLoadListeners.forEach(callback => callback(data));
                        delete this.fileStock[tag].onLoadListeners;
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
                    this.fileStock[tag].progress = e.loaded / e.total;
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
