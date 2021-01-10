"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userController_1 = require("../controllers/userController");
var userRoute = express_1.default.Router();
userRoute.get("/user/:id", userController_1.getUser);
userRoute.get("/users", userController_1.getUsers);
userRoute.post("/user/:id", userController_1.addUser);
userRoute.post("/users", userController_1.addUsers);
exports.default = userRoute;
