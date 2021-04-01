import express, { Router  } from "express";
import { addUser, addUsers, getUser, getUsers, addMoney } from "../../controllers/gokuServer/usersController";

const userRoute: Router = express.Router();

userRoute.get("/goku/user/:id", (req, res, next) => getUser(req, res, next, global.DB_CLIENT));

userRoute.get("/goku/users", (req, res, next) => getUsers(req, res, next, global.DB_CLIENT));

userRoute.post("/goku/user/:id", (req, res, next) => addUser(req, res, next, global.DB_CLIENT));

userRoute.post("/goku/users", (req, res, next) => addUsers(req, res, next, global.DB_CLIENT));

userRoute.patch("/goku/user/reward", (req, res, next) => addMoney(req, res, next, global.DB_CLIENT));

export default userRoute;