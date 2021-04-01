"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var usersController_1 = require("../../controllers/testing/usersController");
var userRoute = express_1.default.Router();
userRoute.get("/test/user/get/:id", function (req, res, next) { return usersController_1.getUser(req, res, next, global.DB_CLIENT); });
userRoute.get("/test/users", function (req, res, next) { return usersController_1.getUsers(req, res, next, global.DB_CLIENT); });
userRoute.post("/test/user/add/:id", function (req, res, next) { return usersController_1.addUser(req, res, next, global.DB_CLIENT); });
userRoute.post("/test/users", function (req, res, next) { return usersController_1.addUsers(req, res, next, global.DB_CLIENT); });
userRoute.patch("/test/user/reward", function (req, res, next) { return usersController_1.addMoney(req, res, next, global.DB_CLIENT); });
exports.default = userRoute;
