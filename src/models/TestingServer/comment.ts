import { model, Schema, Model } from "mongoose";
import { ICommentMongoose } from "yosoyDB-mongoose";

const CommentSchema = new Schema({
	votes: { type: Number, default: 1 },
	content: { type: String },
	author: {
		type: String,
		// ref: "testUser",
		required: [true, "Lipseste user id"]
	}
});

// check this https://stackoverflow.com/questions/53021514/usermodel-is-not-assignable-to-parameter-of-type-document-nulll-mongoose-with
export const TestComment = model<ICommentMongoose>("testComment", CommentSchema);