import { model, Schema, Model, Document } from "mongoose";
import { IUser } from "./user";

export interface IComment extends Document {
  votes: number,
  content: string,
  author: IUser["_id"]
}

const CommentSchema = new Schema({
	votes: { type: Number },
	content: { type: String },
	author: {
		type: Schema.Types.ObjectId,
		ref: "testUser",
		required: [true, "Lipseste user id"]
	}
});

export const TestComment: Model<IComment> = model("testComment", CommentSchema);