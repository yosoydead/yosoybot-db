"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv = __importStar(require("dotenv"));
var errorHandler_1 = require("./middlewares/errorHandler");
var responseType_1 = require("./responseType");
var guild_1 = __importDefault(require("./routes/guild"));
var gokuUsers_1 = __importDefault(require("./routes/gokuUsers"));
dotenv.config();
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, mongoose_1.default.connect("mongodb+srv://yosoydead:" + process.env.DB_PASSWORD + "@yosoybotdb.fsga3.mongodb.net/<dbname>?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })];
            case 1:
                _a.sent();
                console.log("m-am conectat");
                app = express_1.default();
                app.use(cors_1.default());
                //asta ma lasa sa primesc doar json in request
                app.use(express_1.default.json());
                app.use(guild_1.default);
                app.use(gokuUsers_1.default);
                app.get("/", function (req, res) {
                    var json = {
                        message: "salut. faci get request la home route",
                        status: responseType_1.RESPONSE_TYPE.SUCCESS,
                        statusCode: 200
                    };
                    return res.json(json);
                });
                app.post("/", function (req, res) {
                    var json = {
                        message: "salut. faci post request la home route. daca primesti asta din bot, inseamna ca totul e ok :)",
                        status: responseType_1.RESPONSE_TYPE.SUCCESS,
                        statusCode: 200
                    };
                    return res.json(json);
                });
                //intra aici doar atunci cand nu am nicio ruta care sa se potriveasca pt url
                app.get("*", function (req, res, next) {
                    return next(new errorHandler_1.ErrorHandler("nu am gasit ruta", 404));
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
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log("nu am putut sa pornesc serverul?");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })();
