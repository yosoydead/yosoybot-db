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

// check this https://stackoverflow.com/questions/53021514/usermodel-is-not-assignable-to-parameter-of-type-document-nulll-mongoose-with
export const GokuComment = model<ICommentMongoose>("commentGoku", CommentSchema);