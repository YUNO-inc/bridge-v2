import { UserI } from "../../actions/user/interfaces";
import validator from "validator";
import { Model, Schema, model, models } from "mongoose";
import { cleanupModel } from "../../utils/helpers";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Invalid name value. Please try again"],
    trim: true,
    maxlength: [90, `Name too long. Must be less than 91 characters.`],
    minlength: [1, `Name too short. Must have at least 1 character.`],
  },
  email: {
    type: String,
    required: [true, "Invalid email address."],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Invalid email address."],
  },
  phoneNumber: {
    type: String,
    maxlength: [11, `Phone Number too long. Must be less than 11 characters.`],
    minlength: [10, `Phone Number too short. Must have at least 10 character.`],
  },
});

cleanupModel("User");

const User: Model<UserI> = models.User || model<UserI>("User", UserSchema);

export default User;
