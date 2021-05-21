import { RESPONSE_TYPE } from "./responseType";
import { Request, Response, NextFunction} from "express";
export interface ICustomJsonResponse {
  message: string,
  statusCode: number,
  status: RESPONSE_TYPE
}

export type API_OPERATIONS = "get" | "post" | "put" | "patch" | "delete";
export interface ICustomRoute {
  url: string;
  routeHandler: (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => any;
}

export interface IRouteConfig {
  (operation: API_OPERATIONS): [ICustomRoute]
}

export interface IDbCommunication {
  // comments related stuff
  addComment(): any;
  addComments(): any;
  getRandomComment(): any;
  getComments(): any;

  // users related stuff
  getUserData(): any;
  getAllUsers(): any;
  addUser(): any;
  addUsers(): any;
  rewardUser(): any;
}