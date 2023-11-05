import mongoose from "mongoose";


const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description:String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", 
  },
  location: {
    type: String
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  roles: [{
    name: { type: String },
    permissions: [{ type: String }]
  }]
});

const Team = mongoose.model("Team", teamSchema);

export default Team;
