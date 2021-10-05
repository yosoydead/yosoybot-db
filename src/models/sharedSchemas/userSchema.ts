import { Schema } from "mongoose";

const userSchema = (commentRefName: string, transactionsRefName: string): Schema => {
    return new Schema({
        discordServerId: { type: String },
        discordUserId: { type: String },
        discordUsername: { type: String },
        rublerts: { type: Number, default: 10 },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: commentRefName
            }
        ],
        transactions: [
            {
                type: Schema.Types.ObjectId,
                ref: transactionsRefName
            }
        ]
    }, { timestamps: true });
}

export default userSchema;