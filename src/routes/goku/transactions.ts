import { Router } from "express";
import { addTransaction } from "../../controllers/genericTransactionController";
import { ICustomRoute } from "../../types";
import { routeIterator } from "../../utils/routesIterator";

const routesConfig: ICustomRoute[] = [
	{ action: "post", url: "/goku/transactions/add", routeHandler: addTransaction },
];

const transactionsRouter: Router =  routeIterator(routesConfig);
export default transactionsRouter;