import { model, Schema } from "mongoose";
import { IUserTransactionMongoose } from "yosoyDB-mongoose";

const TransactionSchema = new Schema({
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

// check this https://stackoverflow.com/questions/53021514/usermodel-is-not-assignable-to-parameter-of-type-document-nulll-mongoose-with
export const TestTransaction = model<IUserTransactionMongoose>("testTransaction", TransactionSchema);