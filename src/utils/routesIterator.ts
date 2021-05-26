import { ICustomRoute } from "../types";
import express, { Router} from "express";
import DbFactory from "./dbFactory";

export function routeIterator (routesConfig: ICustomRoute[]): Router {
	const resultRouter: Router = express.Router();

	for(let i = 0; i < routesConfig.length; i++) {
		const currentElement = routesConfig[i];
		switch(currentElement.action) {
			case "get": {
				resultRouter.get(currentElement.url, (req, res, next) => currentElement.routeHandler(req, res, next, DbFactory.getInstance()));
				break;
			}
			case "post": {
				resultRouter.post(currentElement.url, (req, res, next) => currentElement.routeHandler(req, res, next, DbFactory.getInstance()));
				break;
			}
			case "patch": {
				resultRouter.patch(currentElement.url, (req, res, next) => currentElement.routeHandler(req, res, next, DbFactory.getInstance()));
				break;
			}
			case "put": {
				resultRouter.put(currentElement.url, (req, res, next) => currentElement.routeHandler(req, res, next, DbFactory.getInstance()));
				break;
			}
			case "delete": {
				resultRouter.delete(currentElement.url, (req, res, next) => currentElement.routeHandler(req, res, next, DbFactory.getInstance()));
				break;
			}
			default: {
				console.log("am dat de o configuratie necunoscuta?");
				break;
			}
		}
	}

	return resultRouter;
}