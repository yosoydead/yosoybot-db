import { Router  } from "express";
import { addUser, addUsers, getUser, getUsers, getUserBank } from "../../controllers/genericUserController";
import { ICustomRoute } from "yosoybotDB";
import { routeIterator } from "../../utils/routesIterator";

const routesConfig: ICustomRoute[] = [
	//get routes
	{ action: "get", url: "/goku/user/get/:id", routeHandler: getUser },
	{ action: "get", url: "/goku/users", routeHandler: getUsers },
	{ action: "get", url: "/test/user/getBank/:id", routeHandler: getUserBank },

	//post routes
	{ action: "post", url: "/goku/user/add/:id", routeHandler: addUser },
	{ action: "post", url: "/goku/users", routeHandler: addUsers },

	//put routes

	//patch routes

	//delete routes
];
const userRoute: Router = routeIterator(routesConfig);

export default userRoute;
