import express, { Router, Request, Response, NextFunction } from "express";
import { addUser, addUsers, getUser, getUsers } from "../controllers/userController";

const userRoute: Router = express.Router();

userRoute.get("/user/:id", getUser);

userRoute.get("/users", getUsers);

userRoute.post("/user/:id", addUser);

userRoute.post("/users", addUsers);

export default userRoute;