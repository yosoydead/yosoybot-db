"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var commentsController_1 = require("../../controllers/gokuServer/commentsController");
var commentRoute = express_1.default.Router();
commentRoute.get("/goku/comment/random", function (request, response, next) { return commentsController_1.getComment(request, response, next, global.DB_CLIENT); });
commentRoute.get("/goku/comments", function (request, response, next) { return commentsController_1.getComments(request, response, next, global.DB_CLIENT); });
commentRoute.post("/goku/comment", function (request, response, next) { return commentsController_1.addComment(request, response, next, global.DB_CLIENT); });
commentRoute.post("/goku/comments", function (request, response, next) { return commentsController_1.addComments(request, response, next, global.DB_CLIENT); });
exports.default = commentRoute;
