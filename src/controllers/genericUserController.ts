import { Request, Response, NextFunction } from "express";
import { IDbCommunication } from "yosoybotDB";
import { IUser } from "yosoyDB-mongoose";

export const getUser = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	const json = await dbClient.getUserData(req.params.id);
	return res.json(json);
};

export const getUsers = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	const json = await dbClient.getAllUsers();
	return res.json(json);
};

export const getUserBank = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	const json = await dbClient.getUserBank(req.params.id);
	return res.json(json);
};

export const addUser = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	const user: IUser = {
		discordServerId: req.body.discordServerId,
		discordUserId: req.body.discordUserId,
		discordUsername: req.body.discordUsername,
		rublerts: 10
	};
	const json = await dbClient.addUser(user);
	return res.json(json);
};

export const addUsers = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	const json = await dbClient.addUsers(req.body);
	return res.json(json);
};
