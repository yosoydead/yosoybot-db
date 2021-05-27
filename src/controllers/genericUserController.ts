import { Request, Response, NextFunction } from "express";
import { IDbCommunication, ICustomJsonResponse, IUser } from "../types";

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
		discordUsername: req.body.discordUsername
	};
	const json = await dbClient.addUser(user);
	return res.json(json);
};

export const addUsers = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	// console.log(req.body);
	dbClient.addUsers();
	const json: ICustomJsonResponse = {
		message: "aici a trebui sa primesc o lista de useri, s-o iterez si sa adaug useri in baza de date",
		statusCode: 200,
		status: "sucess"
	};
	return res.json(json);
};

export const addMoney = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	// console.log(req.body);
	dbClient.rewardUser();

	const json: ICustomJsonResponse = {
		message: "aici a trebui sa pot adauga un user in baza de date",
		statusCode: 200,
		status: "sucess"
	};
	return res.json(json);
};