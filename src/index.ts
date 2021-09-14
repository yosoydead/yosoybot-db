import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { addTransactionsToUsers, transactionStatus } from "./migrations";
// mutat aici pentru ca vreau sa citesc NODE_ENV cat se poate de repede
dotenv.config();

import { ErrorHandler, handlerError } from "./middlewares/errorHandler";
import { APP_ENV, ICustomJsonResponse } from "./types";
import DbFactory from "./utils/dbFactory";

/* 
	- initializez aici instanta de Client pentru ca rutele sunt create printr-o functie
	- daca rutele sunt importate inainte de initializarea Client, ele o sa citeasca instanta drept UNDEFINED si totul o sa crape
*/
const env: APP_ENV | undefined | string = process.env.NODE_ENV;
DbFactory.createInstance(env);

import testUserRouter from "./routes/testing/users";
import testComment from "./routes/testing/comments";
import testTransaction from "./routes/testing/transactions";
import gokuUserRouter from "./routes/goku/users";
import gokuComment from "./routes/goku/comments";
import gokuTransaction from "./routes/goku/transactions";

const localRoutes = [testUserRouter, testComment, testTransaction];
const prodRoutes = [gokuComment, gokuUserRouter, gokuTransaction];

(async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@yosoybotdb.fsga3.mongodb.net/<dbname>?retryWrites=true&w=majority`,
			{ useNewUrlParser: true, useUnifiedTopology: true }
		);
		
		// MIGRATIONS SECTION
		// migrate(env, function() { console.log("transaction migration"); });
		// transactionStatus(env, function() { console.log("transaction migration")});
		// END MIGRATIONS SECTION

		console.log("m-am conectat");
		const app: Application = express();
		app.use(cors());

		//asta ma lasa sa primesc doar json in request
		app.use(express.json());
		
		if (env === "local") {
			localRoutes.map((route) => { app.use(route); });
		} else if (env === "production") {
			prodRoutes.map((route) => { app.use(route); });
		}

		app.get("/", (req: Request, res: Response) => {
			const json: ICustomJsonResponse = {
				message: "salut. faci get request la home route",
				status: "success",
				statusCode: 200
			};

			return res.json(json);
		});

		app.post("/", (req: Request, res: Response) => {
			const json: ICustomJsonResponse = {
				message: "salut. faci post request la home route. daca primesti asta din bot, inseamna ca totul e ok :)",
				status: "success",
				statusCode: 200
			};

			return res.json(json);
		});

		//intra aici doar atunci cand nu am nicio ruta care sa se potriveasca pt url
		app.get("*", (req: Request, res: Response, next: NextFunction) => {
			return next(new ErrorHandler("nu am gasit ruta", 404));
		});

		//aici intra doar daca nu se poate gasi nicio ruta definita pt POST
		app.post("*", (req: Request, res: Response, next: NextFunction) => {
			// let err = new handleError.ErrorHandler(500, `Cannot post on this route: http://${req.get("host")}${req.url}`);
			return next(new ErrorHandler("nu ar trebui sa fac post aici"));
		});

		//aici intra doar daca nu se poate gasi nicio ruta definita pt PATCH
		app.patch("*", (req: Request, res: Response, next: NextFunction) => {
			// let err = new handleError.ErrorHandler(500, `Cannot post on this route: http://${req.get("host")}${req.url}`);
			return next(new ErrorHandler("nu ar trebui sa fac patch aici"));
		});

		//aici intra doar daca nu se poate gasi nicio ruta definita pt PUT
		app.put("*", (req: Request, res: Response, next: NextFunction) => {
			// let err = new handleError.ErrorHandler(500, `Cannot post on this route: http://${req.get("host")}${req.url}`);
			return next(new ErrorHandler("nu ar trebui sa fac put aici"));
		});

		//aici intra doar daca nu se poate gasi nicio ruta definita pt DELETE
		app.delete("*", (req: Request, res: Response, next: NextFunction) => {
			// let err = new handleError.ErrorHandler(500, `Cannot post on this route: http://${req.get("host")}${req.url}`);
			return next(new ErrorHandler("nu ar trebui sa fac delete aici"));
		});

		//aparent, in express, semnatura pentru un error handler trebuie sa aiba 4 argumente neaparat
		app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
			return handlerError(err, res);
		});

		app.listen(3000, () => {
			console.log("server pornit");
		});
	} catch(err) {
		console.log("nu am putut sa pornesc serverul?", err);
	}
})();
