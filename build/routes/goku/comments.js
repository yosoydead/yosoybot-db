"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var commentsController_1 = require("../../controllers/gokuServer/commentsController");
var commentRoute = express_1.default.Router();
commentRoute.get("/goku/comment/:id", commentsController_1.getComment);
commentRoute.get("/goku/comments", commentsController_1.getComments);
commentRoute.post("/goku/comment", commentsController_1.addComment);
commentRoute.post("/goku/comments", commentsController_1.addComments);
exports.default = commentRoute;
