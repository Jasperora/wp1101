import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  events: [String],
  chooseTime: [[Boolean]],
});

const EventSchema = new Schema({
  launcher: String,
  name: { type: String, required: true },
  id: { type: String, unique: true },
  startTime: [Date],
  endTime: [Date],
  attender: [[String]],
  content: String,
});

const UserModel = mongoose.model("User", UserSchema);
const EventModel = mongoose.model("Event", EventSchema);

export { UserModel, EventModel };
