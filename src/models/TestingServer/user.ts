import { model, Schema } from "mongoose";
import { IUserMongoose } from "yosoyDB-mongoose";
import UserSchema from "../sharedSchemas/userSchema";

// check this https://stackoverflow.com/questions/53021514/usermodel-is-not-assignable-to-parameter-of-type-document-nulll-mongoose-with
export const TestUser = model<IUserMongoose>("testUser", UserSchema("testComment", "testTransaction"));