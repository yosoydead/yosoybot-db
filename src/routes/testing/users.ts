import express, { Router  } from "express";
import { addUser, addUsers, getUser, getUsers, addMoney } from "../../controllers/testing/usersController";

const userRoute: Router = express.Router();

userRoute.get("/test/user/:id", getUser);

userRoute.get("/test/users", getUsers);

userRoute.post("/test/user/:id", addUser);

userRoute.post("/test/users", addUsers);

userRoute.patch("/test/user/reward", addMoney);

export default userRoute;