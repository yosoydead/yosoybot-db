import { model, Schema, Model, Document } from "mongoose";
import { IUser } from "./gokuServerUserModel";

export interface IGuild extends Document {
	discordGuildID: string,
	guildAdminID: string,
	originalAdminUsername: string,
	// members: IUser["_id"][]
	// members: Schema.Types.ObjectId[]
}

const GuildSchema: Schema = new Schema({
	discordGuildID: { type: String, required: true },
	guildAdminID: { type: String, required: true },
	originalAdminUsername: { type: String, required: true },
	// members: [{type: Schema.Types.ObjectId, ref: "gokuServerUser"}]
}, { timestamps: true });

export const Guild: Model<IGuild> = model("Guild", GuildSchema);