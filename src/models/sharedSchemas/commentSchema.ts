import { Schema } from "mongoose";

const commentSchema: Schema = new Schema({
	commentDiscordId: { type: String, default: ""},
	content: { type: String },
	author: {
		type: String,
		required: [true, "Lipseste user id"]
	}
});

export default commentSchema;