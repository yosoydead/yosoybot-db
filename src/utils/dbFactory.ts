import DbClient from "../dbClient/Client";
import { GokuComment, GokuUser, TestComment, TestUser } from "../models/index";
import { IDbCommunication, APP_ENV } from "../types";

let instance: IDbCommunication;

const DbFactory = {
	getInstance: (): IDbCommunication => {
		return instance;
	},
	createInstance: (appMode: APP_ENV | string | undefined): void | IDbCommunication => {
		if (appMode === "local") {
			instance = new DbClient("local", TestUser, TestComment);
		} else if (appMode === "production") {
			instance = new DbClient("production", GokuUser, GokuComment);
		} else {
			throw new Error("Am primit undefined sau ceva necunoscut ca app mode :)");
		}
	}
};

export default DbFactory;