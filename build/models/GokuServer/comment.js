"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GokuComment = void 0;
var mongoose_1 = require("mongoose");
var CommentSchema = new mongoose_1.Schema({
    votes: { type: Number },
    content: { type: String },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "userGoku",
        required: [true, "Lipseste goku user id"]
    }
});
exports.GokuComment = mongoose_1.model("commentGoku", CommentSchema);
