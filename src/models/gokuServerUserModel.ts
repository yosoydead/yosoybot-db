import { model, Schema, Model, Document } from "mongoose";

export interface IUser extends Document {
	discordUserId: string,
	rublerts: number
}

const UserSchema: Schema = new Schema({
	discordUserId: { type: String, required: true },
	rublerts: { type: Number, required: true, default: 10 },
}, { timestamps: true });

export const User: Model<IUser> = model("gokuServerUser", UserSchema);