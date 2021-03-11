import { model, Schema, Model, Document } from "mongoose";

export interface UserInterface {
	discordUserId: string,
	rublerts: number,
	serverId: string
}
export interface IUser extends Document {
	discordUserId: string,
	rublerts: number,
	serverId: string
}

const UserSchema: Schema = new Schema({
	discordUserId: { type: String, required: true },
	rublerts: { type: Number, required: true, default: 10 },
	serverId: { type: String, required: true }
}, { timestamps: true });

export const User: Model<IUser> = model("gokuServerUser", UserSchema);