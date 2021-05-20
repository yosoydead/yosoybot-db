import express, { Router  } from "express";
import { addUser, addUsers, getUser, getUsers, addMoney } from "../../controllers/testing/usersController";
const userRoute: Router = express.Router();

// @ts-ignore
userRoute.get("/test/user/get/:id", (req, res, next) => getUser(req, res, next, global.DB_CLIENT));
// @ts-ignore
userRoute.get("/test/users", (req, res, next) => getUsers(req, res, next, global.DB_CLIENT));
// @ts-ignore
userRoute.post("/test/user/add/:id", (req, res, next) => addUser(req, res, next, global.DB_CLIENT));
// @ts-ignore
userRoute.post("/test/users", (req, res, next) => addUsers(req, res, next, global.DB_CLIENT));
// @ts-ignore
userRoute.patch("/test/user/reward", (req, res, next) => addMoney(req, res, next, global.DB_CLIENT));

export default userRoute;