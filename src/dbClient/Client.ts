import { IDbCommunication, ICustomJsonResponse, APP_ENV, IUserMongoose, IComment, ICommentMongoose, IUser, IUserReward, RESPONSE_TYPE, IUserTransaction, IUserTransactionMongoose } from "../types";
import { Model } from "mongoose";
export default class DbClient implements IDbCommunication {
  private UsersModel: Model<IUserMongoose>;
  private CommentsModel: Model<ICommentMongoose>;
	private TransactionsModel: Model<IUserTransactionMongoose>;
	appMode: APP_ENV;

	constructor(mode: APP_ENV, userModel: Model<IUserMongoose>, commentsModel: Model<ICommentMongoose>, transactionsModel: Model<IUserTransactionMongoose>) {
		this.UsersModel = userModel;
		this.CommentsModel = commentsModel;
		this.TransactionsModel = transactionsModel;
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
				return this.createResponseObject(`Comentariul lui ${user.discordUsername} a fost adaugat cu succes >:)`, 200, "success");
			})
			.catch((err) => {		
				return this.createResponseObject("Ceva nu e in regula. Nu am putut adauga mesajul. A se verifica canalul de loguri.", 500, "error");
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
						return this.createResponseObject(`Am adaugat ${commentsRequest.length} comentarii cu succes >:)`, 200, "success");
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
				return this.createResponseObject(`"${quote.content}" de ${user[0].discordUsername}`, 200, "success");
			})
			.catch((err: any) => {
				return this.createResponseObject("Nu am putut descarca un quote? Vezi logurile pe canal.", 500, "error");
			});
	}

	getComments(): Promise<ICustomJsonResponse> {
		console.log("trag toate comentariile");
		return this.CommentsModel.find({})
			.then((comments: ICommentMongoose[]) => {
				return this.createResponseObject(`Aici e lista cu toate comentariile pe care le am din $${this.appMode}`, 200, "success", comments);
			})
			.catch((err: any) => {
				return this.createResponseObject("Nu am putut descarca toate quotes? Vezi logurile pe canal.", 500, "error");
			});
	}

	// users stuff
	getUserData(discordUserId: string): Promise<ICustomJsonResponse> {
		console.log("date despre un user");
		return this.UsersModel.find({ discordUserId: discordUserId})
			.then((userResult: IUser[]) => {
				if (userResult.length === 0) {
					return this.createResponseObject(`Nu am gasit niciun user care sa aiba id-ul: ${discordUserId}`, 200, "success");
				}

				return this.createResponseObject(`Astea sunt datele despre user-ul cu id: ${discordUserId}`, 200, "success", userResult);
			})
			.catch((err: any) => {
				return this.createResponseObject("Nu am putut descarca detalii despre un user. Vezi logurile pe canal.", 500, "error");
			});
	}

	getAllUsers(): Promise<ICustomJsonResponse> {
		console.log("date despre toti userii");
		return this.UsersModel.find({})
			.then((usersResult: IUser[]) => {
				return this.createResponseObject(`Asta ar trebui sa fie lista cu toti userii din ${this.appMode}. Sunt ${usersResult.length} la numar.`, 200, "success", usersResult);
			})
			.catch((err: any) => {
				return this.createResponseObject("Nu am putut descarca toate quotes? Vezi logurile pe canal", 500, "error");
			});
	}

	addUser(user: IUser): Promise<ICustomJsonResponse> {
		console.log("adaug un user");
		return this.UsersModel.create(user)
			.then((user) => {
				return this.createResponseObject(`User-ul cu numele ${user.discordUsername} a fost adaugat cu succes.`, 200, "success");
			})
			.catch((err: any) => {
				return this.createResponseObject("Ceva nu e in regula. Nu am putut adauga user-ul. A se verifica canalul de loguri.", 500, "error");
			});
	}

	addUsers(users: IUserMongoose[]): Promise<ICustomJsonResponse> {
		console.log("adaug multi useri");
		return this.UsersModel.insertMany(users)
			.then((result) => {
				return this.createResponseObject(`Am adaugat lista cu useri in baza de date pe modul ${this.appMode}`, 200, "success");
			})
			.catch((err: any) => {
				return this.createResponseObject("Ceva nu e in regula. Nu am putut adauga userii. A se verifica canalul de loguri.", 500, "error");
			});
	}

	rewardUser(data: IUserReward): Promise<ICustomJsonResponse> {
		return this.UsersModel.findOneAndUpdate({ discordUserId: data.author }, { $inc: { "rublerts": data.howMuch }})
			.then(() => {
				return this.createResponseObject(`Am adaugat bani user-ului cu id ${data.author} in baza de date pe modul ${this.appMode}.`, 200, "success");
			})
			.catch((err: any) => {
				return this.createResponseObject(`Ceva nu e in regula. Nu am putut adauga bani pt user-ul cu id ${data.author}. A se verifica canalul de loguri.`, 500, "error");
			});
	}

	rewardUsers(data: IUserReward[]): Promise<ICustomJsonResponse> {
		return Promise.all(data.map(async (d) => {
			await this.UsersModel.findOneAndUpdate({ discordUserId: d.author }, { $inc: { "rublerts": d.howMuch }});
		}))
			.then(() => {
				return this.createResponseObject(`Am adaugat bani listei de useri in baza de date pe modul ${this.appMode}.`, 200, "success");
			})
			.catch((err: any) => {
				return this.createResponseObject("Ceva nu e in regula. Nu am putut adauga bani listei de useri. A se verifica canalul de loguri.", 500, "error");
			});
	}

	addTransaction(transactions: IUserTransaction[]): Promise<ICustomJsonResponse> {
		console.log("adaug o tranzactie");
		return this.TransactionsModel.insertMany(transactions)
			.then(() => {
				return this.createResponseObject("Tranzactii adaugate cu success.", 200, "success");
			})
			.catch(err => {
				return this.createResponseObject("Nu am reusit sa adaug tranzactiile din varii motive.", 500, "error");
			});
	}
}
