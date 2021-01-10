"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerError = exports.ErrorHandler = void 0;
var responseType_1 = require("../responseType");
var ErrorHandler = /** @class */ (function (_super) {
    __extends(ErrorHandler, _super);
    function ErrorHandler(message, statusCode) {
        if (statusCode === void 0) { statusCode = 500; }
        var _this = _super.call(this) || this;
        _this.message = message;
        _this._statusCode = statusCode;
        return _this;
    }
    return ErrorHandler;
}(Error));
exports.ErrorHandler = ErrorHandler;
var handlerError = function (err, res) {
    var message = err.message, _statusCode = err._statusCode;
    var json = {
        message: message,
        status: responseType_1.RESPONSE_TYPE.ERROR,
        statusCode: _statusCode
    };
    return res
        .status(_statusCode)
        .json(json);
};
exports.handlerError = handlerError;
