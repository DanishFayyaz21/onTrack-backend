import mongoose from "mongoose";
import User from "./User.js";

const { Schema, model, models } = mongoose

// create schema
const driverSchema = new Schema({

  address: String,
  city: String,
  state: String,
  zipCode: String,
  transportation: {
    model: String,
    licensePlate: String,
    color: String
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: "Team"
  }
}, { timestamps: true, toJSON: { getters: true } });

const Driver = User.discriminator("Driver", driverSchema);

export default Driver