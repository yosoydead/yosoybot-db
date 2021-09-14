import { Router } from "express";
import { addTransaction, getUsersBank } from "../../controllers/genericTransactionController";
import { ICustomRoute } from "../../types";
import { routeIterator } from "../../utils/routesIterator";

const routesConfig: ICustomRoute[] = [
	{ action: "post", url: "/test/transactions/add", routeHandler: addTransaction },
	{ action: "get", url: "/test/transactions/getUsersBank", routeHandler: getUsersBank }
];

const transactionsRouter: Router =  routeIterator(routesConfig);
export default transactionsRouter;