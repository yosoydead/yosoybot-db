import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

import { ErrorHandler, handlerError } from "./middlewares/errorHandler";
import { ICustomJsonResponse, IDbCommunication } from "./types";
import { TestComment, TestUser, GokuUser, GokuComment } from "./models";
import DbClient from "./dbClient/Client";

import testUserRouter from "./routes/testing/users";
import testComment from "./routes/testing/comments";
import gokuUserRouter from "./routes/goku/users";
import gokuComment from "./routes/goku/comments";

dotenv.config();

const localRoutes = [testUserRouter, testComment];
const prodRoutes = [gokuComment, gokuUserRouter];

const env = process.env.NODE_ENV;
const LOCAL_ENV_STRING = "local";
const PROD_ENV_STRING = "production";
let dbClient: IDbCommunication;

(async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://yosoydead:${process.env.DB_PASSWORD}@yosoybotdb.fsga3.mongodb.net/<dbname>?retryWrites=true&w=majority`,
			{ useNewUrlParser: true, useUnifiedTopology: true }
		);

		console.log("m-am conectat");
		const app: Application = express();
		app.use(cors());

		//asta ma lasa sa primesc doar json in request
		app.use(express.json());
		
		if (env === LOCAL_ENV_STRING) {
			// @ts-ignore
			dbClient = new DbClient("fjhsdkf", TestUser, TestComment);
			// @ts-ignore
			global.DB_CLIENT = dbClient;
			localRoutes.map((route) => { app.use(route); });
		} else if (env === PROD_ENV_STRING) {
			// @ts-ignore
			dbClient = new DbClient("fjhsdkf", GokuUser, GokuComment);
			// @ts-ignore
			global.DB_CLIENT = dbClient;
			prodRoutes.map((route) => { app.use(route); });
		}

		app.get("/", (req: Request, res: Response) => {
			const json: ICustomJsonResponse = {
				message: "salut. faci get request la home route",
				status: "sucess",
				statusCode: 200
			};

			return res.json(json);
		});

		app.post("/", (req: Request, res: Response) => {
			const json: ICustomJsonResponse = {
				message: "salut. faci post request la home route. daca primesti asta din bot, inseamna ca totul e ok :)",
				status: "sucess",
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
	} catch(err) {
		console.log("nu am putut sa pornesc serverul?", err);
	}
})();
