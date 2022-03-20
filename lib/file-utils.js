var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var FileUtils = /** @class */ (function () {
    function FileUtils(XMLHttpRequest) {
        this.XMLHttpRequest = XMLHttpRequest || globalThis.XMLHttpRequest;
        this.fileStock = {};
    }
    FileUtils.prototype.preload = function () {
        var urls = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            urls[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.all(urls.map(function (url) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.load(url)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); }))];
            });
        });
    };
    FileUtils.prototype.load = function (url, responseType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, !url ? Promise.resolve(null) : new Promise(function (resolve, reject) {
                        if (_this.fileStock[url]) {
                            var _a = _this.fileStock[url], data = _a.data, loaded = _a.loaded, onLoadListeners = _a.onLoadListeners;
                            if (!loaded) {
                                onLoadListeners.push(resolve);
                            }
                            else {
                                resolve(data);
                            }
                        }
                        else {
                            var req_1 = new _this.XMLHttpRequest();
                            _this.fileStock[url] = {
                                data: null,
                                url: url,
                                progress: 0,
                                onLoadListeners: []
                            };
                            req_1.open('GET', url);
                            req_1.responseType = responseType || (url.match(/.(json)$/i) ? "json" : 'blob');
                            req_1.addEventListener('load', function (e) {
                                if (req_1.status === 200) {
                                    var data_1 = req_1.response;
                                    _this.fileStock[url].progress = 1;
                                    _this.fileStock[url].loaded = true;
                                    _this.fileStock[url].data = data_1;
                                    _this.fileStock[url].onLoadListeners.forEach(function (callback) { return callback(data_1); });
                                    delete _this.fileStock[url].onLoadListeners;
                                    resolve(data_1);
                                }
                                else {
                                    reject(new Error("Url could not load: ".concat(url)));
                                }
                            });
                            req_1.addEventListener('error', function (e) {
                                reject(new Error("Network Error"));
                            });
                            req_1.addEventListener('progress', function (e) {
                                _this.fileStock[url].progress = e.loaded / e.total;
                            });
                            req_1.send();
                        }
                    })];
            });
        });
    };
    return FileUtils;
}());
if (typeof module !== "undefined") {
    module.exports = {
        FileUtils: FileUtils
    };
}
