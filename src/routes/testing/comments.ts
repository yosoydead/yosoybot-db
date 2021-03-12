import express, { Router  } from "express";
import { addComment, addComments, getComment, getComments } from "../../controllers/testing/commentsController";

const commentRoute: Router = express.Router();

commentRoute.get("/test/comment/:id", getComment);

commentRoute.get("/test/comments", getComments);

commentRoute.post("/test/comment", addComment);

commentRoute.post("/test/comments", addComments);

export default commentRoute;