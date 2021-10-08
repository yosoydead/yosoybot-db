import { Router } from "express";
import { addComment, addComments, getComment, getComments, removeComment } from "../../controllers/genericCommentsController";
import { ICustomRoute } from "yosoybotDB";
import { routeIterator } from "../../utils/routesIterator";

const routesConfig: ICustomRoute[] = [
	//get routes
	{ action: "get", url: "/goku/comment/random", routeHandler: getComment },
	{ action: "get", url: "/goku/comments", routeHandler: getComments },

	//post routes
	{ action: "post", url: "/goku/comment", routeHandler: addComment },
	{ action: "post", url: "/goku/comments", routeHandler: addComments },
	{ action: "post", url: "/goku/removeComment", routeHandler: removeComment },
	//put routes

	//patch routes

	//delete routes
];
const commentRoute: Router = routeIterator(routesConfig);

export default commentRoute;