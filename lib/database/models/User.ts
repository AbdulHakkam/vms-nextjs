import mongoose from "mongoose";

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  OWNER = "OWNER",
}

export interface IUser {
  name: string;
  email: string;
  image: string;
  emailVerified: boolean;
  teams: mongoose.Schema.Types.ObjectId[];
}

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  emailVerified: { type: Boolean },
  teams: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    unique: true,
  },
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
