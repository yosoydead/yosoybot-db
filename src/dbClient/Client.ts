import { IDbCommunication, ICustomJsonResponse, APP_ENV, IUserMongoose, ICommentMongoose } from "../types";
import { Model, Document } from "mongoose";
import { RESPONSE_TYPE } from "../responseType";

export default class DbClient<U extends Document, C extends Document> implements IDbCommunication {
  private UsersModel: Model<U>;
  private CommentsModel: Model<C>;
	appMode: APP_ENV;

	constructor(mode: APP_ENV, userModel: Model<U>, commentsModel: Model<C>) {
		this.UsersModel = userModel;
		this.CommentsModel = commentsModel;
		this.appMode = mode;
	}
	private createResponseObject(message: string, statusCode: number, status: RESPONSE_TYPE): ICustomJsonResponse {
		return { message, statusCode, status };
	}

	// comments stuff
	addComment(content: string, authorID: string): Promise<ICustomJsonResponse> {
		console.log("adaug comment");
		return this.CommentsModel.create({ content: content, author: authorID })
			.then((comment: C): Promise<IUserMongoose> => {
				// @ts-ignore
				return this.UsersModel.findOneAndUpdate({ discordUserId: authorID }, { $push: { comments: comment._id } });
			})
			.then((user: IUserMongoose) => {
				return this.createResponseObject(`Comentariul lui ${user.discordUsername} a fost adaugat cu succes >:)`, 200, "sucess");
			})
			.catch((err) => {		
				return this.createResponseObject("Ceva nu e in regula. A se verifica canalul de loguri.", 500, "error");
			});
	}

	addComments() {
  	console.log("adaug multe comentarii");
	}

	getRandomComment() {
		console.log("trag un comment random");
		let quote: any;
		return this.CommentsModel.find({})
			.then((result: any) => {
				const index = Math.floor(Math.random() * result.length);
				quote = result[index];

				return this.UsersModel.find({ discordUserId: quote.author});
			})
			.then((user: any) => {
				console.log(user);
        
				return this.createResponseObject(`"${quote.content}" de ${user[0].discordUsername}`, 200, "sucess");
			})
			.catch((err: any) => {
  			return this.createResponseObject("Something went wrong", 500, "error");
			});
	}

	getComments() {
		console.log("trag toate comentariile");
	}

	// users stuff
	getUserData() {
		console.log("date despre un user");
	}

	getAllUsers() {
		console.log("date despre toti userii");
	}

	addUser() {
		console.log("adaug un user");
	}

	addUsers() {
		console.log("adaug multi useri");
	}

	rewardUser() {
		console.log("dau rublerts unui user");
	}
}
