import { model, Schema, Model, Document } from "mongoose";

export interface IComment extends Document {
  votes: number,
  content: string,
  author: string
}

const CommentSchema = new Schema({
	votes: { type: Number, default: 1 },
	content: { type: String },
	author: {
		type: String,
		// ref: "testUser",
		required: [true, "Lipseste user id"]
	}
});

export const TestComment: Model<IComment> = model("testComment", CommentSchema);