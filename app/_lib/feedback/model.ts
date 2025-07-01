import { Model, Schema, model, models } from "mongoose";
import { cleanupModel } from "../utils/helpers";
import { FeedbackDTO } from "@/app/_interfaces/interfaces";

const FeedbackSchema = new Schema(
  {
    name: String,
    phoneNumber: String,
    user: {
      type: Schema.ObjectId,
      ref: "User",
    },
    seen: {
      type: Boolean,
      default: false,
    },
    message: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

cleanupModel("Feedback");

const Feedback: Model<FeedbackDTO> =
  models.Feedback || model<FeedbackDTO>("Feedback", FeedbackSchema);

export default Feedback;
