"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var usersController_1 = require("../../controllers/gokuServer/usersController");
var userRoute = express_1.default.Router();
userRoute.get("/goku/user/:id", usersController_1.getUser);
userRoute.get("/goku/users", usersController_1.getUsers);
userRoute.post("/goku/user/:id", usersController_1.addUser);
userRoute.post("/goku/users", usersController_1.addUsers);
userRoute.patch("/goku/user/reward", usersController_1.addMoney);
exports.default = userRoute;
