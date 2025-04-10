import validator from "validator";
import { Model, Schema, model, models } from "mongoose";
import { cleanupModel } from "../../utils/helpers";
import {
  AddressDTO,
  DEFAULT_COORDS,
  UserDTO,
} from "@/app/_interfaces/interfaces";

const AddressSchema = new Schema<AddressDTO>(
  {
    name: { type: String, default: "Okota" },
    coords: {
      type: [Number],
      default: DEFAULT_COORDS,
      validate: (val: number[]) => val.length === 2,
    },
    isSelected: { type: Boolean, default: false },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

AddressSchema.virtual("id").get(function () {
  return this._id.toString();
});

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
    validate: {
      validator: function (value: string) {
        return /^\+?[1-9]\d{7,14}$/.test(value); // E.164 format
      },
      message: "Invalid phone number format",
    },
  },
  addresses: { type: [AddressSchema], default: [] },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

cleanupModel("User");

const User: Model<UserDTO> = models.User || model<UserDTO>("User", UserSchema);

export default User;
