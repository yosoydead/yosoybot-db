import { Request, Response, NextFunction} from "express";
import { Document } from "mongoose";

export type RESPONSE_TYPE = "success" | "error";
export type TRANSACTION_TYPE = "give" | "receive";
export type TRANSACTION_STATUS = "successful" | "pending" | "rejected";

export interface IComment {
  votes: number;
  content: string;
  author: string;
}

export interface IUser {
  discordServerId: string;
  discordUserId: string;
  discordUsername: string;
}

export interface IUserReward {
  author: string;
  howMuch: number;
}

export interface IUserTransaction {
  reason: string;
  cost: number;
  discordUserId: string;
  status: TRANSACTION_STATUS;
  type: TRANSACTION_TYPE;
  fromDiscordUserId?: string;
  fromDiscordUsername?: string;
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
  transactions: [IUserTransactionMongoose["_id"]];
}

export interface IUserTransactionMongoose extends Document {
  reason: string;
  cost: number;
  discordUserId: string;
  status: TRANSACTION_STATUS;
  type: TRANSACTION_TYPE;
  fromDiscordUserId?: string;
  fromDiscordUsername?: string;
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
  getAllUsers(): Promise<ICustomJsonResponse>;
  getUsersBank(): Promise<ICustomJsonResponse>;
  addUser(user: IUser): Promise<ICustomJsonResponse>;
  //din varii motive, nu mergea sa folosesc IUser pentru ca modelul de mongoose are o referinta la ICommentMongoose
    //si avea tot felul de erori. cu IUserMongoose nu se mai plange
  addUsers(users: IUserMongoose[]): Promise<ICustomJsonResponse>;
  rewardUser(data: IUserReward): Promise<ICustomJsonResponse>;
  rewardUsers(data: IUserReward[]): Promise<ICustomJsonResponse>;

  addTransaction(transactions: IUserTransaction[]): Promise<ICustomJsonResponse>;
  getUserTransactions(userId: string, numberOfTransactions: number): Promise<ICustomJsonResponse>;
}