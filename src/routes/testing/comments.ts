import express, { Router  } from "express";
import { addComment, addComments, getComment, getComments } from "../../controllers/testing/commentsController";

const commentRoute: Router = express.Router();

commentRoute.get("/test/comment/random", (request, response, next) => getComment(request, response, next, global.DB_CLIENT));

commentRoute.get("/test/comments", (request, response, next) => getComments(request, response, next, global.DB_CLIENT));

commentRoute.post("/test/comment", (request, response, next) => addComment(request, response, next, global.DB_CLIENT));

commentRoute.post("/test/comments", (request, response, next) => addComments(request, response, next, global.DB_CLIENT));

export default commentRoute;