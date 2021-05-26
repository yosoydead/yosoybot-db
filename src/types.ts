import { RESPONSE_TYPE } from "./responseType";
import { Request, Response, NextFunction} from "express";
export interface ICustomJsonResponse {
  message: string,
  statusCode: number,
  status: RESPONSE_TYPE
}

export type API_OPERATIONS = "get" | "post" | "put" | "patch" | "delete";
export type APP_ENV = "local" | "production";
export interface ICustomRoute {
  url: string;
  routeHandler: (req: Request, res: Response, next: NextFunction, dbClient: IDbCommunication) => any;
  action: API_OPERATIONS;
}

export interface IDbCommunication {
  appMode: APP_ENV;
  // comments related stuff
  addComment(content: string, authorID: string): any;
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