import { Router  } from "express";
import { getComment, getComments, addComment, addComments, removeComment } from "../../controllers/genericCommentsController";
import { ICustomRoute } from "yosoybotDB";
import { routeIterator } from "../../utils/routesIterator";

const routesConfig: ICustomRoute[] = [
	//get routes
	{ action: "get", url: "/test/comment/random", routeHandler: getComment },
	{ action: "get", url: "/test/comments", routeHandler: getComments },

	//post routes
	{ action: "post", url: "/test/comment", routeHandler: addComment },
	{ action: "post", url: "/test/comments", routeHandler: addComments },
	{ action: "post", url: "/test/removeComment", routeHandler: removeComment },
	//put routes

	//patch routes

	//delete routes
];
const commentRoute: Router = routeIterator(routesConfig);

export default commentRoute;