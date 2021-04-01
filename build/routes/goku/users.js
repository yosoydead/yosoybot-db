"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var usersController_1 = require("../../controllers/gokuServer/usersController");
var userRoute = express_1.default.Router();
userRoute.get("/goku/user/:id", function (req, res, next) { return usersController_1.getUser(req, res, next, global.DB_CLIENT); });
userRoute.get("/goku/users", function (req, res, next) { return usersController_1.getUsers(req, res, next, global.DB_CLIENT); });
userRoute.post("/goku/user/:id", function (req, res, next) { return usersController_1.addUser(req, res, next, global.DB_CLIENT); });
userRoute.post("/goku/users", function (req, res, next) { return usersController_1.addUsers(req, res, next, global.DB_CLIENT); });
userRoute.patch("/goku/user/reward", function (req, res, next) { return usersController_1.addMoney(req, res, next, global.DB_CLIENT); });
exports.default = userRoute;
