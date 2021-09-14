import { Router } from "express";
import { addTransaction, getUsersBank, getUserTransactions } from "../../controllers/genericTransactionController";
import { ICustomRoute } from "../../types";
import { routeIterator } from "../../utils/routesIterator";

const routesConfig: ICustomRoute[] = [
	{ action: "post", url: "/test/transactions/add", routeHandler: addTransaction },
	{ action: "get", url: "/test/transactions/getUsersBank", routeHandler: getUsersBank },
	{ action: "get", url: "/test/transactions/getUserTransactions/:id", routeHandler: getUserTransactions }
];

const transactionsRouter: Router =  routeIterator(routesConfig);
export default transactionsRouter;