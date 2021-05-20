import express, { Router  } from "express";
import { addComment, addComments, getComment, getComments } from "../../controllers/testing/commentsController";

const commentRoute: Router = express.Router();
// @ts-ignore
commentRoute.get("/test/comment/random", (request, response, next) => getComment(request, response, next, global.DB_CLIENT));
// @ts-ignore
commentRoute.get("/test/comments", (request, response, next) => getComments(request, response, next, global.DB_CLIENT));
// @ts-ignore
commentRoute.post("/test/comment", (request, response, next) => addComment(request, response, next, global.DB_CLIENT));
// @ts-ignore
commentRoute.post("/test/comments", (request, response, next) => addComments(request, response, next, global.DB_CLIENT));

export default commentRoute;