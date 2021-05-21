import { Router  } from "express";
import { addComment, addComments, getComment, getComments } from "../../controllers/testing/commentsController";
import { ICustomRoute } from "../../types";
import { routeIterator } from "../../utils/routesIterator";

const routesConfig: ICustomRoute[] = [
	//get routes
	{ action: "get", url: "/test/comment/random", routeHandler: getComment },
	{ action: "get", url: "/test/comments", routeHandler: getComments },

	//post routes
	{ action: "post", url: "/test/comment", routeHandler: addComment },
	{ action: "post", url: "/test/comments", routeHandler: addComments },

	//put routes

	//patch routes

	//delete routes
];
const commentRoute: Router = routeIterator(routesConfig);

export default commentRoute;