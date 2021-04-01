import { IDbCommunication, ICustomJsonResponse } from "../types";
import { Model, Document } from "mongoose";
import { RESPONSE_TYPE } from "../responseType";

export default class DbClient<U extends Document, C extends Document> implements IDbCommunication {
  private UsersModel: Model<U>;
  private CommentsModel: Model<C>;

  constructor(baseUrl: string, userModel: Model<U>, commentsModel: Model<C>) {
  	this.UsersModel = userModel;
  	this.CommentsModel = commentsModel;
  }
  private createResponseObject(message: string, statusCode: number, status: RESPONSE_TYPE): ICustomJsonResponse {
  	console.log("fac response msg");
    
  	return {
  		message,
  		statusCode,
  		status
  	};
  }
  // comments stuff
  addComment(content: string, authorID: string) {
  	console.log("adaug comment");
  	return this.CommentsModel.create({ content: content, author: authorID })
  		.then((comment) => {
  			return this.UsersModel.findOneAndUpdate({ discordUserId: authorID }, {$push: { comments: comment._id }});
  		})
  		.then((user) => {
  			console.log("success");
  			return this.createResponseObject("Comment added successfully", 200, "sucess");
  		})
  		.catch((err) => {
  			return this.createResponseObject("Something went wrong", 500, "error");
  		});
  }

  addComments() {
  	console.log("adaug multe comentarii");
  }

  getRandomComment() {
  	console.log("trag un comment random");
    let quote;
    return this.CommentsModel.find({})
      .then((result) => {
        const index = Math.floor(Math.random() * result.length);
        quote = result[index];

        return this.UsersModel.find({ discordUserId: quote.author});
      })
      .then((user) => {
        console.log(user);
        
        return this.createResponseObject(`"${quote.content}" de ${user[0].discordUsername}`, 200, "sucess");
      })
      .catch((err) => {
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