import { model, Schema, Model } from "mongoose";
import { ICommentMongoose } from "../../types";

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

export const GokuComment: Model<ICommentMongoose> = model("commentGoku", CommentSchema);