import { model, Schema, Model } from "mongoose";
import { IUserTransactionMongoose } from "../../types";

const TransactionSchema = new Schema({
	reason: { type: String, required: true },
	cost: { type: Number, required: true },
	discordUserId: { type: String, required: true }
});

export const TestTransaction: Model<IUserTransactionMongoose> = model("testTransaction", TransactionSchema);