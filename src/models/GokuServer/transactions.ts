import { model, Schema, Model } from "mongoose";
import { IUserTransactionMongoose } from "../../types";

const TransactionSchema = new Schema({
	reason: { type: String, required: true },
	cost: { type: Number, required: true },
	discordUserId: { type: String, required: true },
	status: { type: String, required: true }
}, { timestamps: true });

export const GokuTransactions: Model<IUserTransactionMongoose> = model("transactionGoku", TransactionSchema);