import { model, Schema, Model } from "mongoose";
import { IUserMongoose } from "yosoyDB-mongoose";

const UserSchema: Schema = new Schema({
	discordServerId: { type: String },
	discordUserId: { type: String },
	discordUsername: { type: String },
	rublerts: { type: Number, default: 10 },
	comments: [
		{
			type: Schema.Types.ObjectId,
			ref: "commentGoku"
		}
	],
	transactions: [
		{
			type: Schema.Types.ObjectId,
			ref: "transactionGoku"
		}
	]
}, { timestamps: true });

// check this https://stackoverflow.com/questions/53021514/usermodel-is-not-assignable-to-parameter-of-type-document-nulll-mongoose-with
export const GokuUser = model<IUserMongoose>("userGoku", UserSchema);