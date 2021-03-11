"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GokuUser = void 0;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    discordServerId: { type: String },
    discordUserId: { type: String },
    discordUsername: { type: String },
    rublerts: { type: Number, default: 10 },
    comments: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "commentGoku"
        }
    ]
}, { timestamps: true });
exports.GokuUser = mongoose_1.model("userGoku", UserSchema);
