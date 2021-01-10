import express, { Router, Request, Response, NextFunction } from "express";
import { addGuild, getGuilds, getGuild, addGuilds } from "../controllers/guildController";

const guildRouter: Router = express.Router();

guildRouter.get("/guilds", getGuilds);

guildRouter.get("/guild/:id", getGuild);

guildRouter.post("/guild:/id", addGuild);

guildRouter.post("/guilds", addGuilds);

export default guildRouter;