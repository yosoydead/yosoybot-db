import { model } from "mongoose";
import { IUserTransactionMongoose } from "yosoyDB-mongoose";
import TransactionSchema from "../sharedSchemas/transactionSchema";

// check this https://stackoverflow.com/questions/53021514/usermodel-is-not-assignable-to-parameter-of-type-document-nulll-mongoose-with
export const TestTransaction = model<IUserTransactionMongoose>("testTransaction", TransactionSchema);