import { Request, Response, NextFunction} from "express";
import { RESPONSE_TYPE } from "../../responseType";
import { ICustomJsonResponse, IDbCommunication } from "../../types";

export const getComment = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	const result = await dbClient.getRandomComment();
	// const json: ICustomJsonResponse = {
	// 	message: "de aici ar trebui sa pot returna detalii despre un singur comment cu id din param",
	// 	statusCode: 200,
	// 	status: RESPONSE_TYPE.SUCCESS
	// };
	return res.json(result);
};

export const getComments = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	dbClient.getComments();
	const json: ICustomJsonResponse = {
		message: "de aici ar trebui sa pot returna intreaga lista de commenturi din baza de date",
		statusCode: 200,
		status: RESPONSE_TYPE.SUCCESS
	};
	return res.json(json);
};

export const addComment = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	// console.log(req.params.id);
	// dbClient.addComment();
	const response = await dbClient.addComment(req.body.content, req.body.author);
	console.log("comment response controller", response);
	
	// console.log(args);
	// TestComment.create({ content: req.body.content, author: req.body.author })
	// 	.then((com) => {
	// 		console.log("inserat", com);
	// 		return TestUser.findOneAndUpdate({ discordUserId: req.body.author }, { $push: { comments: com._id }});
	// 	})
	// 	.then(user => {
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 	});
	// const json: ICustomJsonResponse = {
	// 	message: "aici a trebui sa pot adauga un comment in baza de date",
	// 	statusCode: 200,
	// 	status: RESPONSE_TYPE.SUCCESS 
	// };
	return res.json(response);
};

export const addComments = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	dbClient.addComments();
	const json: ICustomJsonResponse = {
		message: "aici a trebui sa primesc o lista de commenturi, s-o iterez si sa adaug useri in baza de date",
		statusCode: 200,
		status: RESPONSE_TYPE.SUCCESS 
	};
	return res.json(json);
};