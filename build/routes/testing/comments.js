"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var commentsController_1 = require("../../controllers/testing/commentsController");
var commentRoute = express_1.default.Router();
commentRoute.get("/test/comment/:id", commentsController_1.getComment);
commentRoute.get("/test/comments", commentsController_1.getComments);
commentRoute.post("/test/comment/:id", commentsController_1.addComment);
commentRoute.post("/test/comments", commentsController_1.addComments);
exports.default = commentRoute;
