import mongoose from "mongoose";

export enum TeamAction {
  ADD = "ADD",
  REMOVE = "REMOVE",
  UPDATE = "UPDATE",
}

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    default: [],
  },
  admins: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    default: [],
  },
});

export default mongoose.models.Team || mongoose.model("Team", TeamSchema);
