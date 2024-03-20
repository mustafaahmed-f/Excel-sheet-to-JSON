import mongoose, { Schema, model } from "mongoose";

const qAndASchema = new Schema({
  Question: { type: String, required: true },
  Answer: { type: String, required: true },
});

const qAndAModel = model.QAndA || mongoose.model("QAndA", qAndASchema);

export default qAndAModel;
