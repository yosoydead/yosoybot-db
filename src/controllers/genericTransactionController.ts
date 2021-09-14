import { Request, Response, NextFunction } from "express";
import { IDbCommunication } from "../types";

export const addTransaction = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	const json = await dbClient.addTransaction(req.body.transactions);
	return res.json(json);
};

export const getUsersBank = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	const json = await dbClient.getUsersBank();
	return res.json(json);
};