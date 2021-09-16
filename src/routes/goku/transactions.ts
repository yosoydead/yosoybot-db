import { Router } from "express";
import { addTransaction, getUsersBank, getUserTransactions } from "../../controllers/genericTransactionController";
import { ICustomRoute } from "../../types";
import { routeIterator } from "../../utils/routesIterator";

const routesConfig: ICustomRoute[] = [
	{ action: "post", url: "/goku/transactions/add", routeHandler: addTransaction },
	{ action: "get", url: "/goku/transactions/getUsersBank", routeHandler: getUsersBank },
	{ action: "get", url: "/goku/transactions/getUserTransactions/:id/:howMany", routeHandler: getUserTransactions }
];

const transactionsRouter: Router =  routeIterator(routesConfig);
export default transactionsRouter;