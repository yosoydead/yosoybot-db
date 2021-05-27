import { model, Schema, Model } from "mongoose";
import { IUser } from "../../types";

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

export const TestUser: Model<IUser> = model("testUser", UserSchema);