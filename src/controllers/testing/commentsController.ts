import { Request, Response, NextFunction} from "express";
import { RESPONSE_TYPE } from "../../responseType";
import { ICustomJsonResponse } from "../../types";
// import { User } from "../models/gokuServerUserModel";

export const getComment = async (req: Request, res: Response, next: NextFunction) => {
	console.log(req.params.id);
	
	const json: ICustomJsonResponse = {
		message: "de aici ar trebui sa pot returna detalii despre un singur comment cu id din param",
		statusCode: 200,
		status: RESPONSE_TYPE.SUCCESS
	};
	return res.json(json);
};

export const getComments = async (req: Request, res: Response, next: NextFunction) => {
	const json: ICustomJsonResponse = {
		message: "de aici ar trebui sa pot returna intreaga lista de commenturi din baza de date",
		statusCode: 200,
		status: RESPONSE_TYPE.SUCCESS
	};
	return res.json(json);
};

export const addComment = async (req: Request, res: Response, next: NextFunction) => {
	console.log(req.params.id);

	const json: ICustomJsonResponse = {
		message: "aici a trebui sa pot adauga un comment in baza de date",
		statusCode: 200,
		status: RESPONSE_TYPE.SUCCESS 
	};
	return res.json(json);
};

export const addComments = async (req: Request, res: Response, next: NextFunction) => {
	const json: ICustomJsonResponse = {
		message: "aici a trebui sa primesc o lista de commenturi, s-o iterez si sa adaug useri in baza de date",
		statusCode: 200,
		status: RESPONSE_TYPE.SUCCESS 
	};
	return res.json(json);
};