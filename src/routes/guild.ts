import express, { Router, Request, Response, NextFunction } from "express";
import { RESPONSE_TYPE } from "../responseType";
import { ICustomJsonResponse } from "../types";

const guildRouter: Router = express.Router();

guildRouter.get("/guild", async (req: Request, res: Response, next: NextFunction) => {
	const json: ICustomJsonResponse = {
		message: "de aici ar trebui sa pot returna intreaga lista de guilde in care se afla botul",
		statusCode: 200,
		status: RESPONSE_TYPE.SUCCESS 
	};
	return res.json(json);
});

guildRouter.post("/guild", async (req: Request, res: Response, next: NextFunction) => {
	const json: ICustomJsonResponse = {
		message: "aici ar trebui sa pot adauga o guilda. ar trebui sa trimit o lista cu useri si id-ul guildei",
		statusCode: 200,
		status: RESPONSE_TYPE.SUCCESS 
	};
	return res.json(json);
});

export default guildRouter;