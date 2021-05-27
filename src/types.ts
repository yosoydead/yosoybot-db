import { RESPONSE_TYPE } from "./responseType";
import { Request, Response, NextFunction} from "express";
import { Document } from "mongoose";

export interface IComment {
  votes: number;
  content: string;
  author: string;
}

export interface IUser {
  discordServerId: string;
  discordUserId: string;
  discordUsername: string;
  rublerts: number;
}
export interface ICommentMongoose extends Document {
  votes: number;
  content: string;
  author: string;
}

export interface IUserMongoose extends Document {
  discordServerId: string;
  discordUserId: string;
  discordUsername: string;
  rublerts: number;
  comments: [ICommentMongoose["_id"]];
}

export interface ICustomJsonResponse {
  message: string;
  statusCode: number;
  status: RESPONSE_TYPE;
  arrayOfStuff?: any;
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
  addComment(content: string, authorID: string): Promise<ICustomJsonResponse>;
  addComments(comments: IComment[]): Promise<ICustomJsonResponse>;
  getRandomComment(): Promise<ICustomJsonResponse>;
  getComments(): Promise<ICustomJsonResponse>;

  // users related stuff
  getUserData(discordUserId: string): Promise<ICustomJsonResponse>;
  getAllUsers(): any;
  addUser(): any;
  addUsers(): any;
  rewardUser(): any;
}