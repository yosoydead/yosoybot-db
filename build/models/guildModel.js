"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guild = void 0;
var mongoose_1 = require("mongoose");
var GuildSchema = new mongoose_1.Schema({
    discordGuildID: { type: String, required: true },
    guildAdminID: { type: String, required: true },
    originalAdminUsername: { type: String, required: true },
}, { timestamps: true });
exports.Guild = mongoose_1.model("Guild", GuildSchema);
