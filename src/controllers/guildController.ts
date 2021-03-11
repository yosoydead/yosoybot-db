import { Request, Response, NextFunction} from "express";
import { RESPONSE_TYPE } from "../responseType";
import { ICustomJsonResponse } from "../types";
import { Guild, IGuild } from "../models/guildModel";
import { User, UserInterface } from "../models/gokuServerUserModel";

export const getGuilds = async (req: Request, res: Response, next: NextFunction) => {
	const a: IGuild[] = await Guild.find({}).map((el: IGuild) => el.discordGuildID);
	console.log(a);
	// const b = a.map(el => {
	// 	console.log(el);
	// 	return el.discordGuildID;
	// });
	// console.log(b);
	
	
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
	const guilds: IGuild[] = req.body;
	// console.log(req.body);
	const users: UserInterface[] = [];

	req.body.map(el => {
		const membersIdList = el.membersIdList;
		membersIdList.map(id => {
			users.push({
				serverId: el.discordGuildID,
				discordUserId: id,
				rublerts: 10
			});
		});
	});

	// console.log(users);
	

	User.insertMany(users)
		.then(() => {
			console.log("am reusit sa adaug toti userii");
		})
		.catch(err => {
			console.log("nu am putut adauga userii", err);
		});

	// const guildsStored: IGuild[] = await Guild.find({});
	// const guildIds = guildsStored.map(el => el.discordGuildID);

	// guilds.map(async (el) => {
	// 	if(guildIds.includes(el.discordGuildID)){
	// 		console.log("deja exista guilda asta", el.discordGuildID);
	// 	}else {
	// 		await Guild.create(el);
	// 		console.log("am adaugat guilda cu", el.discordGuildID, el.originalAdminUsername);
	// 	}
	// });

	const json: ICustomJsonResponse = {
		message: "aici ar trebui sa primesc o lista de guilde, s-o iterez si sa adaug in baza de date",
		statusCode: 200,
		status: RESPONSE_TYPE.SUCCESS 
	};
	return res.json(json);
};