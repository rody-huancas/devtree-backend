import mongoose, { Schema } from "mongoose";

export interface IUser {
    name    : string,
    email   : string,
    password: string,
}

const userSchema = new Schema({
  name    : { type: String, require: true, trim: true },
  email   : { type: String, require: true, trim: true, unique: true },
  password: { type: String, require: true, trim: true },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;