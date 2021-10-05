import { model } from "mongoose";
import { ICommentMongoose } from "yosoyDB-mongoose";
import CommentSchema from "../sharedSchemas/commentSchema";

// check this https://stackoverflow.com/questions/53021514/usermodel-is-not-assignable-to-parameter-of-type-document-nulll-mongoose-with
export const TestComment = model<ICommentMongoose>("testComment", CommentSchema);