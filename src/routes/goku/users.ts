import { Router  } from "express";
import { addUser, addUsers, getUser, getUsers, addMoney } from "../../controllers/genericUserController";
import { ICustomRoute } from "../../types";
import { routeIterator } from "../../utils/routesIterator";

const routesConfig: ICustomRoute[] = [
	//get routes
	{ action: "get", url: "/goku/user/get/:id", routeHandler: getUser },
	{ action: "get", url: "/goku/users", routeHandler: getUsers },

	//post routes
	{ action: "post", url: "/goku/user/add/:id", routeHandler: addUser },
	{ action: "post", url: "/goku/users", routeHandler: addUsers },

	//put routes

	//patch routes
	{ action: "patch", url: "/goku/user/reward", routeHandler: addMoney }

	//delete routes
];
const userRoute: Router = routeIterator(routesConfig);

export default userRoute;