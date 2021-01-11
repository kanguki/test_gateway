"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.Log = void 0;
class Log {
    constructor() {
        this.error = function (data, additionalData) {
            console.log('\x1b[40m%s\x1b[0m', data, additionalData ? additionalData : '');
        };
        this.info = function (data, additionalData) {
            console.log('\x1b[32m%s\x1b[0m', data, additionalData ? additionalData : '');
        };
        this.package = function (data, additionalData) {
            console.log('\x1b[34m%s\x1b[0m', data, additionalData ? additionalData : '');
        };
        this.warn = function (data, additionalData) {
            console.log('\x1b[31m%s\x1b[0m', data, additionalData ? additionalData : '');
        };
        this.emphasize = function (data, additionalData) {
            console.log('\x1b[35m%s\x1b[0m', data, additionalData ? additionalData : '');
        };
    }
}
exports.Log = Log;
exports.log = new Log();
//# sourceMappingURL=log.js.map