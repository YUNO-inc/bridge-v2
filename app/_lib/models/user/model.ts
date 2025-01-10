import { UserI } from "../../actions/user/interfaces";
import validator from "validator";
import { Model, Schema, model, models } from "mongoose";

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
});

const User: Model<UserI> = models.User || model<UserI>("User", UserSchema);

export default User;
