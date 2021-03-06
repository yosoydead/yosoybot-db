import { Request, Response, NextFunction} from "express";
import { IDbCommunication } from "yosoybotDB";

export const getComment = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	const json = await dbClient.getRandomComment();
	return res.json(json);
};

export const getComments = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	const json = await dbClient.getComments();
	return res.json(json);
};

export const addComment = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	const json = await dbClient.addComment(req.body.content, req.body.author, req.body.commentDiscordId);
	return res.json(json);
};

export const addComments = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	const json = await dbClient.addComments(req.body.comments);
	return res.json(json);
};

export const removeComment = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	const json = await dbClient.removeComment(req.body.commentDiscordId);
	return res.json(json);
};