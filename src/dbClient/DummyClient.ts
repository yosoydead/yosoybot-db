import { IDbCommunication, APP_ENV, ICustomJsonResponse, IComment, IUser, IUserReward } from "../types";
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
  addComments(comments: IComment[]): Promise<ICustomJsonResponse> {
    console.log(`DummyClient console logging mode: ${this.appMode} addComments()`, comments);
    const dummyRes: ICustomJsonResponse = {
  		message: "adaugat comments din dummy",
  		status: "sucess",
  		statusCode: 200
  	};
  	return Promise.resolve(dummyRes);
  }
  getRandomComment(): Promise<ICustomJsonResponse> {
  	console.log(`DummyClient console logging mode: ${this.appMode} getRandomComment()`);
    const dummyRes: ICustomJsonResponse = {
  		message: "dau un random quote din dummy",
  		status: "sucess",
  		statusCode: 200
  	};
  	return Promise.resolve(dummyRes);
  }
  getComments(): Promise<ICustomJsonResponse> {
  	console.log(`DummyClient console logging mode: ${this.appMode} getComments()`);
    const dummyRes: ICustomJsonResponse = {
  		message: "dau o lista de quotes din dummy",
  		status: "sucess",
  		statusCode: 200
  	};
  	return Promise.resolve(dummyRes);
  }
  getUserData(id: string): Promise<ICustomJsonResponse>{
  	console.log(`DummyClient console logging mode: ${this.appMode} getUserData()`);
    const dummyRes: ICustomJsonResponse = {
  		message: "dau date despre user din dummy",
  		status: "sucess",
  		statusCode: 200
  	};
  	return Promise.resolve(dummyRes);
  }
  getAllUsers(): Promise<ICustomJsonResponse> {
  	console.log(`DummyClient console logging mode: ${this.appMode} getAllUsers()`);
    const dummyRes: ICustomJsonResponse = {
  		message: "dau toti userii din dummy",
  		status: "sucess",
  		statusCode: 200
  	};
  	return Promise.resolve(dummyRes);
  }
  addUser(user: IUser): Promise<ICustomJsonResponse> {
  	console.log(`DummyClient console logging mode: ${this.appMode} addUser()`);
    const dummyRes: ICustomJsonResponse = {
  		message: "adaug un user din dummy",
  		status: "sucess",
  		statusCode: 200
  	};
  	return Promise.resolve(dummyRes);
  }
  addUsers(users: IUser[]): Promise<ICustomJsonResponse> {
  	console.log(`DummyClient console logging mode: ${this.appMode} addUsers()`);
    const dummyRes: ICustomJsonResponse = {
  		message: "adaug users din dummy",
  		status: "sucess",
  		statusCode: 200
  	};
  	return Promise.resolve(dummyRes);
  }
  rewardUser(data: IUserReward): Promise<ICustomJsonResponse> {
  	console.log(`DummyClient console logging mode: ${this.appMode} rewardUser()`, data);
		const dummyRes: ICustomJsonResponse = {
  		message: "adaug bani unui user din dummy",
  		status: "sucess",
  		statusCode: 200
  	};
  	return Promise.resolve(dummyRes);
  }
	rewardUsers(data: IUserReward[]): Promise<ICustomJsonResponse> {
		console.log(`DummyClient console logging mode: ${this.appMode} rewardUsers()`, data);
		const dummyRes: ICustomJsonResponse = {
  		message: "adaug bani multor useri din dummy",
  		status: "sucess",
  		statusCode: 200
  	};
  	return Promise.resolve(dummyRes);
	}
}