import { Schema } from "mongoose";

const transactionSchema: Schema = new Schema({
	reason: { type: String, required: true },
	cost: { type: Number, required: true },
	discordUserId: { type: String, required: true },
	status: { type: String, required: true },
	type: { type: String, required: true },
	initiatorDiscordUserId: { type: String, required: false, default: "N/A" },
	initiatorDiscordUsername: { type: String, required: false, default: "N/A" },
	receiverDiscordUserId: { type: String, required: false, default: "N/A" },
	receiverDiscordUsername: { type: String, required: false, default: "N/A" }
}, { timestamps: true });

export default transactionSchema;