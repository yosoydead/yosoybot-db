import { model, Schema, Model, Document } from "mongoose";
export interface IComment extends Document {
  votes: number,
  content: string,
  author: string
}

const CommentSchema = new Schema({
	votes: { type: Number },
	content: { type: String },
	author: {
		// type: Schema.Types.ObjectId,
		// ref: "userGoku",
		type: String,
		required: [true, "Lipseste goku user id"]
	}
});

export const GokuComment: Model<IComment> = model("commentGoku", CommentSchema);