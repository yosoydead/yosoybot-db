"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    discordUserId: { type: String, required: true },
    rublerts: { type: Number, required: true, default: 10 },
    serverId: { type: String, required: true }
}, { timestamps: true });
exports.User = mongoose_1.model("gokuServerUser", UserSchema);
