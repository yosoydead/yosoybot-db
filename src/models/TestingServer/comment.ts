import { model, Schema, Model } from "mongoose";
import { ICommentMongoose } from "../../types";

const CommentSchema = new Schema({
	votes: { type: Number, default: 1 },
	content: { type: String },
	author: {
		type: String,
		// ref: "testUser",
		required: [true, "Lipseste user id"]
	}
});

export const TestComment: Model<ICommentMongoose> = model("testComment", CommentSchema);