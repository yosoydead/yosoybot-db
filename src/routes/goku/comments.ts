import express, { Router  } from "express";
import { addComment, addComments, getComment, getComments } from "../../controllers/gokuServer/commentsController";

const commentRoute: Router = express.Router();

commentRoute.get("/goku/comment/random", (request, response, next) => getComment(request, response, next, global.DB_CLIENT));

commentRoute.get("/goku/comments", (request, response, next) => getComments(request, response, next, global.DB_CLIENT));

commentRoute.post("/goku/comment", (request, response, next) => addComment(request, response, next, global.DB_CLIENT));

commentRoute.post("/goku/comments", (request, response, next) => addComments(request, response, next, global.DB_CLIENT));

export default commentRoute;