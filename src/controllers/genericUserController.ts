import { Request, Response, NextFunction } from "express";
import { IDbCommunication, IUser } from "../types";

export const getUser = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	const json = await dbClient.getUserData(req.params.id);
	return res.json(json);
};

export const getUsers = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	const json = await dbClient.getAllUsers();
	return res.json(json);
};

export const addUser = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	const user: IUser = {
		discordServerId: req.body.discordServerId,
		discordUserId: req.body.discordUserId,
		discordUsername: req.body.discordUsername,
	};
	const json = await dbClient.addUser(user);
	return res.json(json);
};

export const addUsers = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	const json = await dbClient.addUsers(req.body.users);
	return res.json(json);
};

export const addMoney = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	const json = await dbClient.rewardUser({ author: req.body.author, howMuch: req.body.howMuch });
	return res.json(json);
};

export const addMoneyToMultipleUsers = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	const json = await dbClient.rewardUsers(req.body.rewardsList);
	return res.json(json);
};