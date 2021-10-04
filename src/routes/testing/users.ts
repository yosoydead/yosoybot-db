import { Router  } from "express";
import { getUser, getUsers, addUser, addUsers } from "../../controllers/genericUserController";
import { ICustomRoute } from "yosoybotDB";
import { routeIterator } from "../../utils/routesIterator";

const routesConfig: ICustomRoute[] = [
	//get routes
	{ action: "get", url: "/test/user/get/:id", routeHandler: getUser },
	{ action: "get", url: "/test/users", routeHandler: getUsers },

	//post routes
	{ action: "post", url: "/test/user/add", routeHandler: addUser },
	{ action: "post", url: "/test/users", routeHandler: addUsers },

	//put routes

	//patch routes

	//delete routes
];
const userRoute: Router = routeIterator(routesConfig);

export default userRoute;