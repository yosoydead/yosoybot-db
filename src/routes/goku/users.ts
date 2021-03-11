import express, { Router  } from "express";
import { addUser, addUsers, getUser, getUsers, addMoney } from "../../controllers/gokuServer/usersController";

const userRoute: Router = express.Router();

userRoute.get("/goku/user/:id", getUser);

userRoute.get("/goku/users", getUsers);

userRoute.post("/goku/user/:id", addUser);

userRoute.post("/goku/users", addUsers);

userRoute.patch("/goku/user/reward", addMoney);

export default userRoute;