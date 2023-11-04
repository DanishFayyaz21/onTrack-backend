import mongoose from "mongoose";

const { Schema, model, models } = mongoose

// create schema
const UserSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  role: {
    type: String,
    enum: ["admin", "driver", "dispatcher","super-admin"],
  },
  avatar: {
    type: String
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: "Team"
  }


}, { timestamps: true, toJSON: { getters: true } });

const User = model("user", UserSchema);

export default User