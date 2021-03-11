"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestComment = void 0;
var mongoose_1 = require("mongoose");
var CommentSchema = new mongoose_1.Schema({
    votes: { type: Number },
    content: { type: String },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "testUser",
        required: [true, "Lipseste user id"]
    }
});
exports.TestComment = mongoose_1.model("testComment", CommentSchema);
