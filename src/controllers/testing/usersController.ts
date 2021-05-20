import { Request, Response, NextFunction} from "express";
import { ICustomJsonResponse, IDbCommunication } from "../../types";

export const getUser = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	console.log(req.params.id);
	dbClient.getUserData();
	
	const json: ICustomJsonResponse = {
		message: "de aici ar trebui sa pot returna detalii despre un singur user cu id din param",
		statusCode: 200,
		status: "sucess"
	};
	return res.json(json);
};

export const getUsers = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	dbClient.getAllUsers();
	// TestUser.find({})
	// 	.populate("comments")
	// 	.exec()
	// 	.then((r) => {
	// 		console.log(r);
	// 		return res.send(r);
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});
	const json: ICustomJsonResponse = {
		message: "de aici ar trebui sa pot returna intreaga lista de useri din baza de date",
		statusCode: 200,
		status: "sucess"
	};
	return res.json(json);
};

export const addUser = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	console.log(req.params.id);
	dbClient.addUser();
	const json: ICustomJsonResponse = {
		message: "aici a trebui sa pot adauga un user in baza de date",
		statusCode: 200,
		status: "sucess"
	};
	return res.json(json);
};

export const addUsers = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	console.log(req.body);
	dbClient.addUsers();
	const json: ICustomJsonResponse = {
		message: "aici a trebui sa primesc o lista de useri, s-o iterez si sa adaug useri in baza de date",
		statusCode: 200,
		status: "sucess"
	};
	return res.json(json);

	// TestUser.insertMany(req.body)
	// 	.then((a) => {
	// 		console.log(a);
	// 		return res.json(json);
	// 	})
	// 	.catch((err) => {
	// 		return res.json({
	// 			"eroare": err
	// 		});
	// 	});
};

export const addMoney = async (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => {
	// console.log(req.body);
	dbClient.rewardUser();
	// TestUser.findOneAndUpdate({ discordUserId: req.body.author }, { $inc: { "rublerts": parseInt(req.body.howMuch) }})
	// 	.then(r => {
	// 		console.log(r);
			
	// 		const json: ICustomJsonResponse = {
	// 			message: "aici a trebui sa pot adauga bani pt un user",
	// 			statusCode: 200,
	// 			status: RESPONSE_TYPE.SUCCESS 
	// 		};
	// 		return res.json(json);
	// 	})
	// 	.catch(err => {
	// 		// console.log(err);
	// 		return res.json({
	// 			"eroare": err
	// 		});
	// 	});

	const json: ICustomJsonResponse = {
		message: "aici a trebui sa pot adauga un user in baza de date",
		statusCode: 200,
		status: "sucess"
	};
	return res.json(json);
};