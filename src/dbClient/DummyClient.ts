import { IDbCommunication, APP_ENV, ICustomJsonResponse, IComment } from "../types";
import { Model, Document } from "mongoose";

export default class DbClient<U extends Document, C extends Document> implements IDbCommunication {
  private UsersModel: Model<U>;
  private CommentsModel: Model<C>;
  appMode: APP_ENV;

  constructor(mode: APP_ENV, userModel: Model<U>, commentsModel: Model<C>) {
  	this.UsersModel = userModel;
  	this.CommentsModel = commentsModel;
  	this.appMode = mode;
  }
  
  addComment(content: string, authorID: string): Promise<ICustomJsonResponse> {
  	const dummyRes: ICustomJsonResponse = {
  		message: "adaugat comment din dummy",
  		status: "sucess",
  		statusCode: 200
  	};
  	console.log(`DummyClient console logging mode: ${this.appMode} addComment()`);
  	return Promise.resolve(dummyRes);
  }
  addComments(comments: IComment[]) {
  	console.log(`DummyClient console logging mode: ${this.appMode} addComments()`);
    const dummyRes: ICustomJsonResponse = {
  		message: "adaugat comments din dummy",
  		status: "sucess",
  		statusCode: 200
  	};
  	console.log(`DummyClient console logging mode: ${this.appMode} addComments()`, comments);
  	return Promise.resolve(dummyRes);
  }
  getRandomComment() {
  	console.log(`DummyClient console logging mode: ${this.appMode} getRandomComment()`);
  }
  getComments() {
  	console.log(`DummyClient console logging mode: ${this.appMode} getComments()`);
  }
  getUserData() {
  	console.log(`DummyClient console logging mode: ${this.appMode} getUserData()`);
  }
  getAllUsers() {
  	console.log(`DummyClient console logging mode: ${this.appMode} getAllUsers()`);
  }
  addUser() {
  	console.log(`DummyClient console logging mode: ${this.appMode} addUser()`);
  }
  addUsers() {
  	console.log(`DummyClient console logging mode: ${this.appMode} addUsers()`);
  }
  rewardUser() {
  	console.log(`DummyClient console logging mode: ${this.appMode} rewardUser()`);
  }
}