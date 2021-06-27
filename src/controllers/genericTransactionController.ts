import { Request, Response, NextFunction } from "express";
import { IDbCommunication } from "../types";

export const addTransaction = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	const json = await dbClient.addTransaction();
	return res.json(json);
};