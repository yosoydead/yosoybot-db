import express, { Router  } from "express";
import { addComment, addComments, getComment, getComments } from "../../controllers/gokuServer/commentsController";

const commentRoute: Router = express.Router();

commentRoute.get("/goku/comment/:id", getComment);

commentRoute.get("/goku/comments", getComments);

commentRoute.post("/goku/comment", addComment);

commentRoute.post("/goku/comments", addComments);

export default commentRoute;