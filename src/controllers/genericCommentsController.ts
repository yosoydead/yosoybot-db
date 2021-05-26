import { Request, Response, NextFunction} from "express";
import { ICustomJsonResponse, IDbCommunication } from "../types";

export const getComment = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	// const result = await dbClient.getRandomComment();
	const json: ICustomJsonResponse = {
		message: "de aici ar trebui sa pot returna detalii despre un singur comment cu id din param",
		statusCode: 200,
		status: "sucess"
	};
	return res.json(json);
};

export const getComments = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	// dbClient.getComments();
	const json: ICustomJsonResponse = {
		message: "de aici ar trebui sa pot returna intreaga lista de commenturi din baza de date",
		statusCode: 200,
		status:	"sucess"
	};
	return res.json(json);
};

export const addComment = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	// console.log(req.params.id);
	// const response = await dbClient.addComment(req.body.content, req.body.author);
	// console.log("comment response controller", response);
	const json: ICustomJsonResponse = {
		message: "aici a trebui sa pot adauga un comment in baza de date",
		statusCode: 200,
		status: "sucess" 
	};
	return res.json(json);
};

export const addComments = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	// dbClient.addComments();
	const json: ICustomJsonResponse = {
		message: "aici a trebui sa primesc o lista de commenturi, s-o iterez si sa adaug useri in baza de date",
		statusCode: 200,
		status: "sucess"
	};
	return res.json(json);
};