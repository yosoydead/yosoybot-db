import { model, Schema, Model, Document } from "mongoose";
import { IComment} from "./comment";

export interface IUserGoku extends Document {
  discordServerId: string,
  discordUserId: string,
  discordUsername: string
  rublerts: number,
  comments: [IComment["_id"]]
}

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
	]
}, { timestamps: true });

export const GokuUser: Model<IUserGoku> = model("userGoku", UserSchema);