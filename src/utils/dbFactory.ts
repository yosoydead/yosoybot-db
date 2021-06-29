import DbClient from "../dbClient/Client";
import DummyClient from "../dbClient/DummyClient";
import { GokuComment, GokuUser, GokuTransactions, TestComment, TestUser, TestTransaction } from "../models/index";
import { IDbCommunication, APP_ENV } from "../types";

let instance: IDbCommunication;

const DbFactory = {
	getInstance: (): IDbCommunication => {
		return instance;
	},
	createInstance: (appMode: APP_ENV | string | undefined): void | IDbCommunication => {
		if (appMode === "local") {
			instance = new DbClient("local", TestUser, TestComment, TestTransaction);
			// instance = new DummyClient("local", TestComment, TestUser);
		} else if (appMode === "production") {
			instance = new DbClient("production", GokuUser, GokuComment, GokuTransactions);
		} else {
			throw new Error("Am primit undefined sau ceva necunoscut ca app mode :)");
		}
	}
};

export default DbFactory;