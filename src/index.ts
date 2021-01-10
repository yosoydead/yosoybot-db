import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";

import { ErrorHandler, handlerError } from "./middlewares/errorHandler";
import { RESPONSE_TYPE } from "./responseType";
import { ICustomJsonResponse } from "./types";

const app: Application = express();
app.use(cors());

app.get("/", (req: Request, res: Response) => {
	const json: ICustomJsonResponse = {
		message: "salut. faci request la home route",
		status: RESPONSE_TYPE.SUCCESS,
		statusCode: 200
	};

	return res.json(json);
});

//intra aici doar atunci cand nu am nicio ruta care sa se potriveasca pt url
app.get("*", (req: Request, res: Response, next: NextFunction) => {
	return next(new ErrorHandler("nu am gasit ruta"));
});

//aici intra doar daca nu se poate gasi nicio ruta definita pt POST
app.post("*", (req: Request, res: Response, next: NextFunction) => {
	// let err = new handleError.ErrorHandler(500, `Cannot post on this route: http://${req.get("host")}${req.url}`);
	// return next(err);
	return next(new ErrorHandler("nu ar trebui sa fac post aici"));
});


//aparent, in express, semnatura pentru un error handler trebuie sa aiba 4 argumente neaparat
app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
	return handlerError(err, res);
});

app.listen(3000, () => {
	console.log("server pornit");
});
