import express, { Router  } from "express";
import { addUser, addUsers, getUser, getUsers, addMoney } from "../../controllers/gokuServer/usersController";

const userRoute: Router = express.Router();
// @ts-ignore
userRoute.get("/goku/user/:id", (req, res, next) => getUser(req, res, next, global.DB_CLIENT));
// @ts-ignore
userRoute.get("/goku/users", (req, res, next) => getUsers(req, res, next, global.DB_CLIENT));
// @ts-ignore
userRoute.post("/goku/user/:id", (req, res, next) => addUser(req, res, next, global.DB_CLIENT));
// @ts-ignore
userRoute.post("/goku/users", (req, res, next) => addUsers(req, res, next, global.DB_CLIENT));
// @ts-ignore
userRoute.patch("/goku/user/reward", (req, res, next) => addMoney(req, res, next, global.DB_CLIENT));

export default userRoute;