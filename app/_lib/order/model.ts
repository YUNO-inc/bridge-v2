import { Model, Schema, Types, model, models } from "mongoose";
import { cleanupModel } from "../utils/helpers";
import { OrderDTO } from "@/app/_interfaces/interfaces";

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: [true, "No user was specified for this order."],
    },
    items: {
      type: [Schema.ObjectId],
      ref: "Item",
      required: [true, "No item was included in this order."],
      validate: {
        validator: function (v: Types.ObjectId[] | undefined) {
          return Array.isArray(v) && v.length >= 1;
        },
        message:
          "No item was included in this order. At least one item is required.",
      },
    },
    businesses: {
      type: [Schema.ObjectId],
      ref: "Business",
      required: [
        true,
        "No business or pickup points was included in this order.",
      ],
      validate: {
        validator: function (v: Types.ObjectId[] | undefined) {
          return Array.isArray(v) && v.length >= 1;
        },
        message:
          "No business or pickup points was included in this order. At least business is required.",
      },
    },
    farthestPurchase: {
      type: Schema.ObjectId,
      ref: "Business",
      required: [true, "No farthest purchase was received."],
    },
    totalItemPrice: {
      type: Number,
      required: [
        true,
        "We were unable to calculate total item price for your order.",
      ],
    },
    totalDeliveryPrice: {
      type: Number,
      required: [
        true,
        "We were unable to calculate total delivery price for your order.",
      ],
    },
    status: {
      type: String,
      enum: ["active", "pending"],
      default: "active",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

cleanupModel("Order");

const Order: Model<OrderDTO> =
  models.Order || model<OrderDTO>("Order", OrderSchema);

export default Order;
