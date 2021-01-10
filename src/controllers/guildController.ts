import { Request, Response, NextFunction} from "express";
import { RESPONSE_TYPE } from "../responseType";
import { ICustomJsonResponse } from "../types";
import { Guild } from "../models/guildModel";

export const getGuilds = async (req: Request, res: Response, next: NextFunction) => {
	const a = await Guild.find({});
	console.log(a);
	
	const json: ICustomJsonResponse = {
		message: "de aici ar trebui sa pot returna intreaga lista de guilde in care se afla botul",
		statusCode: 200,
		status: RESPONSE_TYPE.SUCCESS 
	};
	return res.json(json);
};

export const getGuild = async (req: Request, res: Response, next: NextFunction) => {
	const json: ICustomJsonResponse = {
		message: "de aici ar trebui sa pot returna detalii despre o guilda",
		statusCode: 200,
		status: RESPONSE_TYPE.SUCCESS 
	};
	return res.json(json);
};

export const addGuild = async (req: Request, res: Response, next: NextFunction) => {
	const discordID = req.params.id;
	console.log(discordID);
	
	const a = await Guild.create({ discordGuildID: discordID, guildAdminID: "dsasadsa"});
	console.log(a);
	
	const json: ICustomJsonResponse = {
		message: "aici ar trebui sa pot adauga o guilda. ar trebui sa trimit o lista cu useri si id-ul guildei",
		statusCode: 200,
		status: RESPONSE_TYPE.SUCCESS 
	};
	return res.json(json);
};

export const addGuilds = async (req: Request, res: Response, next: NextFunction) => {
	const json: ICustomJsonResponse = {
		message: "aici ar trebui sa primesc o lista de guilde, s-o iterez si sa adaug in baza de date",
		statusCode: 200,
		status: RESPONSE_TYPE.SUCCESS 
	};
	return res.json(json);
};