import { Model, Schema, model, models } from "mongoose";
import { cleanupModel } from "../../utils/helpers";
import { ItemDTO } from "@/app/_interfaces/interfaces";

const ItemSchema = new Schema(
  {
    name: {
      type: String,
      required: [
        true,
        "Invalid item name. Please fill this field and try again",
      ],
      maxlength: [
        120,
        `Item name is too long. Must be less than 121 characters.`,
      ],
      minlength: [1, `Item name is too short. Must have at least 1 character.`],
    },
    image: String,
    price: { type: Number, min: [0, "Price is invalid."] },
    slug: String,
    businessData: {
      type: Schema.ObjectId,
      ref: "Business",
      required: [true, "Unable to find a parent business for this item."],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ItemSchema.index({ slug: 1, businessData: 1 }, { unique: true });
ItemSchema.index({ name: "text" });

cleanupModel("Item");

const Item: Model<ItemDTO> = models.Item || model<ItemDTO>("Item", ItemSchema);

export default Item;
