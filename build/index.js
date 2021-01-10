"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var errorHandler_1 = require("./middlewares/errorHandler");
var responseType_1 = require("./responseType");
var app = express_1.default();
app.use(cors_1.default());
app.get("/", function (req, res) {
    var json = {
        message: "salut. faci request la home route",
        status: responseType_1.RESPONSE_TYPE.SUCCESS,
        statusCode: 200
    };
    return res.json(json);
});
//intra aici doar atunci cand nu am nicio ruta care sa se potriveasca pt url
app.get("*", function (req, res, next) {
    return next(new errorHandler_1.ErrorHandler("nu am gasit ruta"));
});
//aici intra doar daca nu se poate gasi nicio ruta definita pt POST
app.post("*", function (req, res, next) {
    // let err = new handleError.ErrorHandler(500, `Cannot post on this route: http://${req.get("host")}${req.url}`);
    // return next(err);
    return next(new errorHandler_1.ErrorHandler("nu ar trebui sa fac post aici"));
});
//aparent, in express, semnatura pentru un error handler trebuie sa aiba 4 argumente neaparat
app.use(function (err, req, res, next) {
    return errorHandler_1.handlerError(err, res);
});
app.listen(3000, function () {
    console.log("server pornit");
});
