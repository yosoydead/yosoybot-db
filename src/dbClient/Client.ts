import { IDbCommunication, ICustomJsonResponse, APP_ENV,  RESPONSE_TYPE } from "yosoybotDB";
import { IUserMongoose, IComment, ICommentMongoose, IUser, IUserTransactionMongoose, IUserTransaction } from "yosoyDB-mongoose";
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

	getUsersBank(): Promise<ICustomJsonResponse> {
		return this.UsersModel.find({})
			.then((usersResult: IUserMongoose[]) => {
				const usersBank = usersResult.map((u) => {
					return {
						discordUserId: u.discordUserId,
						rublerts: u.rublerts
					}
				});

				return this.createResponseObject(`Asta ar trebui sa fie lista cu toti userii si banii lor din ${this.appMode}. Sunt ${usersResult.length} la numar.`, 200, "success", usersBank);
			})
			.catch((err: any) => {
				return this.createResponseObject("Nu am putut descarca useri + bani? Vezi logurile pe canal", 500, "error");
			});
	}

	getAllUsers(): Promise<ICustomJsonResponse> {
		console.log("date despre toti userii");
		return this.UsersModel.find({})
			.then((usersResult: IUser[]) => {
				return this.createResponseObject(`Asta ar trebui sa fie lista cu toti userii din ${this.appMode}. Sunt ${usersResult.length} la numar.`, 200, "success", usersResult);
			})
			.catch((err: any) => {
				return this.createResponseObject("Nu am putut descarca datele despre useri? Vezi logurile pe canal", 500, "error");
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

	addTransaction(transactions: IUserTransaction[]): Promise<ICustomJsonResponse> {
		console.log("adaug o tranzactie");
		return this.TransactionsModel.insertMany(transactions)
			.then((transactionsRequest: IUserTransactionMongoose[]): Promise<ICustomJsonResponse> => {
				return this.UsersModel.find({})
					.then((usersRequest: IUserMongoose[]) => {
						const newUsersList = [...usersRequest];
						for(let i = 0; i < transactionsRequest.length; i++) {
							const user = newUsersList.find(u => u.discordUserId === transactionsRequest[i].discordUserId);
							// nu are cum sa nu gaseasca userul respectiv dar daca nu il pun nullable, ar da eroare la compilare
							if (transactionsRequest[i].type === "receive" && transactionsRequest[i].status === "rejected") continue;

							user?.transactions.push(transactionsRequest[i]._id);
							if (user?.rublerts! + transactionsRequest[i].cost > 0) {
								// banii userului nu trebuie sa scada mai mult de 0
								user!.rublerts += transactionsRequest[i].cost;
							}
						}
						return Promise.all(newUsersList.map(async (user) => {
							await this.UsersModel.updateOne({ _id: user._id}, { $set: { transactions: user.transactions, rublerts: user.rublerts }});
						}));
					})
					.then(() => {
						return this.createResponseObject(`Am adaugat ${transactionsRequest.length} tranzactii cu succes >:)`, 200, "success");
					});
			})
			.catch((err) => {
				console.log(err);
				return this.createResponseObject("Ceva nu e in regula. A se verifica canalul de loguri.", 500, "error");
			});
	}

	async getUserTransactions(userId: string, numberOfTransactions: number): Promise<ICustomJsonResponse> {
		const number: number = numberOfTransactions <= 0 ? 10 : numberOfTransactions;
		const url = this.appMode === 'local' ? "http://localhost:3000/test/transactions/getUserTransactions/" : "http://157.230.99.199:3000/goku/transactions/getUserTransactions/";
		// console.log(await this.UsersModel.findOne({ discordUserId: userId}).populate({path: 'transactions'}));
		
		// return this.TransactionsModel.find({ discordUserId: userId })
		// 	.then((transactions: IUserTransactionMongoose[]) => {
		// 		// daca dau un numar cu minus in slice, imi returneaza elemente
		// 			// de la sfarsitul listei spre inceput
		// 		const limitedTransactions = transactions.slice((number * -1)).reverse();
		// 		return this.createResponseObject(`Tranzactiile userului cu id ${userId} au fost gasite = ${limitedTransactions.length}. Acceseaza linkul pentru a vedea tot: ${url}${userId}/${numberOfTransactions}`, 200, "success", limitedTransactions);
		// 	})
		// 	.catch(() => {
		// 		return this.createResponseObject("Ceva nu e in regula. Nu pot descarca tranzactiile pt un user.", 500, "error");
		// 	});

		return this.UsersModel.findOne({ discordUserId: userId}).populate({path: 'transactions'})
			.then((userData) => {
				const dataToSend = [
					// @ts-ignore
					{ userId: userData?.discordServerId, username: userData?.discordUsername, bank: userData?.rublerts, lastUpdate: new Date(userData?.updatedAt).toUTCString() },
					userData?.transactions
				];
				return this.createResponseObject(`Salut ${userData?.discordUsername}. Acceseaza linkul pentru a afla datele despre tranzactiile tale: ${url}${userId}/${numberOfTransactions}`, 200, "success", dataToSend);
				// return this.createResponseObject(`Tranzactiile userului cu id ${userId} au fost gasite = ${limitedTransactions.length}. Acceseaza linkul pentru a vedea tot: ${url}${userId}/${numberOfTransactions}`, 200, "success", limitedTransactions);
			})
			.catch(() => {
				return this.createResponseObject("Ceva nu e in regula. Nu pot descarca tranzactiile pt un user.", 500, "error");
			});
	}
}
