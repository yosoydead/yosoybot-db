import { Schema } from "mongoose";

const commentSchema: Schema = new Schema({
	votes: { type: Number, default: 1 },
	content: { type: String },
	author: {
		type: String,
		required: [true, "Lipseste user id"]
	}
});

export default commentSchema;