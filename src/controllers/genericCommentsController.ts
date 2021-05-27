import { Request, Response, NextFunction} from "express";
import { ICustomJsonResponse, IDbCommunication } from "../types";

export const getComment = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	dbClient.getRandomComment();
	const json: ICustomJsonResponse = {
		message: "de aici ar trebui sa pot returna detalii despre un singur comment cu id din param",
		statusCode: 200,
		status: "sucess"
	};
	return res.json(json);
};

export const getComments = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	dbClient.getComments();
	const json: ICustomJsonResponse = {
		message: "de aici ar trebui sa pot returna intreaga lista de commenturi din baza de date",
		statusCode: 200,
		status:	"sucess"
	};
	return res.json(json);
};

export const addComment = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	const json = await dbClient.addComment(req.body.content, req.body.author);
	return res.json(json);
};

export const addComments = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	const json = await dbClient.addComments(req.body.comments);
	return res.json(json);
};