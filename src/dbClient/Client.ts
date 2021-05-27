import { IDbCommunication, ICustomJsonResponse, APP_ENV, IUserMongoose, IComment, ICommentMongoose, IUser } from "../types";
import { Model } from "mongoose";
import { RESPONSE_TYPE } from "../responseType";

export default class DbClient implements IDbCommunication {
  private UsersModel: Model<IUserMongoose>;
  private CommentsModel: Model<ICommentMongoose>;
	appMode: APP_ENV;

	constructor(mode: APP_ENV, userModel: Model<IUserMongoose>, commentsModel: Model<ICommentMongoose>) {
		this.UsersModel = userModel;
		this.CommentsModel = commentsModel;
		this.appMode = mode;
	}
	private createResponseObject(message: string, statusCode: number, status: RESPONSE_TYPE, arrayOfStuff: any = []): ICustomJsonResponse {
		return { message, statusCode, status, arrayOfStuff };
	}

	// comments stuff
	addComment(content: string, authorID: string): Promise<ICustomJsonResponse> {
		console.log("adaug comment");
		return this.CommentsModel.create({ content: content, author: authorID })
			.then((comment): Promise<IUserMongoose> => {
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

	addComments(comments: IComment[]): Promise<ICustomJsonResponse> {
		console.log("adaug multe comentarii", ...comments);
		return this.CommentsModel.insertMany(comments)
			.then((commentsRequest): Promise<ICustomJsonResponse> => {
				return this.UsersModel.find({})
					.then((usersRequest: IUserMongoose[]) => {
						const newUsersList = [...usersRequest];
						for(let i = 0; i < commentsRequest.length; i++) {
							const user = newUsersList.find(u => u.discordUserId === commentsRequest[i].author);
							// nu are cum sa nu gaseasca userul respectiv dar daca nu il pun nullable, ar da eroare la compilare
							user?.comments.push(commentsRequest[i]._id);
						}

						return Promise.all(newUsersList.map(async (user) => {
							await this.UsersModel.updateOne({ _id: user._id}, { $set: { comments: user.comments }});
						}));
					})
					.then(() => {
						return this.createResponseObject(`Am adaugat ${commentsRequest.length} comentarii cu succes >:)`, 200, "sucess");
					});
			})
			.catch((err) => {
				console.log(err);
				return this.createResponseObject("Ceva nu e in regula. A se verifica canalul de loguri.", 500, "error");
			});
	}

	getRandomComment(): Promise<ICustomJsonResponse> {
		console.log("trag un comment random");
		let quote: IComment;
		return this.CommentsModel.find({})
			.then((result: IComment[]) => {
				const index = Math.floor(Math.random() * result.length);
				quote = result[index];

				return this.UsersModel.find({ discordUserId: quote.author});
			})
			.then((user: IUser[]) => {
				return this.createResponseObject(`"${quote.content}" de ${user[0].discordUsername}`, 200, "sucess");
			})
			.catch((err: any) => {
				return this.createResponseObject("Nu am putut descarca un quote? Vezi logurile pe canal", 500, "error");
			});
	}

	getComments(): Promise<ICustomJsonResponse> {
		console.log("trag toate comentariile");
		return this.CommentsModel.find({})
			.then((comments: ICommentMongoose[]) => {
				return this.createResponseObject(`Aici e lista cu toate comentariile pe care le am din $${this.appMode}`, 200, "sucess", comments);
			})
			.catch((err: any) => {
				return this.createResponseObject("Nu am putut descarca toate quotes? Vezi logurile pe canal", 500, "error");
			});
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
