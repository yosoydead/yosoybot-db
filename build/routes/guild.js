"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var guildController_1 = require("../controllers/guildController");
var guildRouter = express_1.default.Router();
guildRouter.get("/guilds", guildController_1.getGuilds);
guildRouter.get("/guild/:id", guildController_1.getGuild);
guildRouter.post("/guild/:id", guildController_1.addGuild);
guildRouter.post("/guilds", guildController_1.addGuilds);
exports.default = guildRouter;
