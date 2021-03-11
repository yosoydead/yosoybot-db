import { model, Schema, Model, Document } from "mongoose";
import { IUserGoku } from "./user";

export interface IComment extends Document {
  votes: number,
  content: string,
  author: IUserGoku["_id"]
}

const CommentSchema = new Schema({
	votes: { type: Number },
	content: { type: String },
	author: {
		type: Schema.Types.ObjectId,
		ref: "userGoku",
		required: [true, "Lipseste goku user id"]
	}
});

export const GokuComment: Model<IComment> = model("commentGoku", CommentSchema);