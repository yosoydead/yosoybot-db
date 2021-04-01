import { IDbCommunication } from "../../types";
import { Model, Document } from "mongoose";

export default class DbClient<U extends Document, C extends Document> implements IDbCommunication {
  private UsersModel: Model<U>;
  private CommentsModel: Model<C>;

  constructor(baseUrl: string, userModel: Model<U>, commentsModel: Model<C>) {
  	this.UsersModel = userModel;
  	this.CommentsModel = commentsModel;
  }

  // comments stuff
  addComment() {
    console.log("adaug comment");
  }

  addComments() {
    console.log("adaug multe comentarii");
  }

  getRandomComment() {
    console.log("trag un comment random");
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