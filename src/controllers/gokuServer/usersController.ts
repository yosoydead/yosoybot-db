import { Request, Response, NextFunction} from "express";
import { RESPONSE_TYPE } from "../../responseType";
import { ICustomJsonResponse } from "../../types";
import { GokuUser } from "../../models/GokuServer/user";

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
	console.log(req.params.id);
	
	const json: ICustomJsonResponse = {
		message: "de aici ar trebui sa pot returna detalii despre un singur user cu id din param",
		statusCode: 200,
		status: RESPONSE_TYPE.SUCCESS
	};
	return res.json(json);
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
	const json: ICustomJsonResponse = {
		message: "de aici ar trebui sa pot returna intreaga lista de useri din baza de date",
		statusCode: 200,
		status: RESPONSE_TYPE.SUCCESS
	};
	return res.json(json);
};

export const addUser = async (req: Request, res: Response, next: NextFunction) => {
	console.log(req.params.id);

	const json: ICustomJsonResponse = {
		message: "aici a trebui sa pot adauga un user in baza de date",
		statusCode: 200,
		status: RESPONSE_TYPE.SUCCESS 
	};
	return res.json(json);
};

export const addUsers = async (req: Request, res: Response, next: NextFunction) => {
	console.log(req.body);
	
	const json: ICustomJsonResponse = {
		message: "aici a trebui sa primesc o lista de useri, s-o iterez si sa adaug useri in baza de date",
		statusCode: 200,
		status: RESPONSE_TYPE.SUCCESS 
	};

	GokuUser.insertMany(req.body)
		.then((a) => {
			console.log(a);
			return res.json(json);
		})
		.catch((err) => {
			return res.json({
				"eroare": err
			});
		});
};

export const addMoney = async (req: Request, res: Response, next: NextFunction) => {
	console.log(req.body);
	GokuUser.findOneAndUpdate({ discordUserId: req.body.author }, { $inc: { "rublerts": parseInt(req.body.howMuch) }})
		.then(r => {
			console.log(r);
			
			const json: ICustomJsonResponse = {
				message: "aici a trebui sa pot adauga un user in baza de date",
				statusCode: 200,
				status: RESPONSE_TYPE.SUCCESS 
			};
			return res.json(json);
		})
		.catch(err => {
			// console.log(err);
			return res.json({
				"eroare": err
			});
		});

	// const json: ICustomJsonResponse = {
	// 	message: "aici a trebui sa pot adauga un user in baza de date",
	// 	statusCode: 200,
	// 	status: RESPONSE_TYPE.SUCCESS 
	// };
	// return res.json(json);
};