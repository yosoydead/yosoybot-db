import { model, Schema, Model } from "mongoose";
import { IUserMongoose } from "../../types";

const UserSchema: Schema = new Schema({
	discordServerId: { type: String },
	discordUserId: { type: String },
	discordUsername: { type: String },
	rublerts: { type: Number, default: 10 },
	comments: [
		{
			type: Schema.Types.ObjectId,
			ref: "testComment"
		}
	]
}, { timestamps: true });

export const TestUser: Model<IUserMongoose> = model("testUser", UserSchema);