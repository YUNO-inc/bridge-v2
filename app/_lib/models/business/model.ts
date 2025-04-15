import { Model, Schema, model, models } from "mongoose";
import { cleanupModel } from "../../utils/helpers";
import {
  BUSINESS_TYPES,
  BusinessAddressDTO,
  BusinessDTO,
  DEFAULT_COORDS,
  DEFAULT_GEOJSON,
  RecommendationDTO,
} from "@/app/_interfaces/interfaces";
import mongoose from "mongoose";
import { calcDeliveryPrice } from "@/app/_utils/helpers";

const BusinessAddressSchema = new Schema<BusinessAddressDTO>(
  {
    name: { type: String, default: "Okota" },
    type: { type: String, default: DEFAULT_GEOJSON },
    coordinates: {
      type: [Number],
      default: DEFAULT_COORDS,
      validate: (val: number[]) => val.length === 2,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

BusinessAddressSchema.virtual("id").get(function () {
  return this._id.toString();
});

const RecommendationSchema = new Schema<RecommendationDTO>(
  {
    businessType: { type: String, required: true },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const BusinessSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Invalid Business name. Please check and try again"],
      maxlength: [
        120,
        `Business name too long. Must be less than 121 characters.`,
      ],
      minlength: [
        1,
        `Business name too short. Must have at least 1 character.`,
      ],
    },
    businessTypes: {
      type: [String],
      enum: BUSINESS_TYPES,
      default: [],
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Unable to find an owner account for your business."],
    },
    address: {
      type: BusinessAddressSchema,
      required: [
        true,
        "Business lacks an address which is crucial for people to find it.",
      ],
      default: {},
    },
    profileImg: String,
    slug: { type: String, unique: true, required: true },
    recommendations: { type: [RecommendationSchema], default: [] },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

BusinessSchema.virtual("deliveryPrice");
BusinessSchema.index({ address: "2dsphere" });

BusinessSchema.post(/^find/, function (d, next) {
  const docs: BusinessDTO[] = d;
  const pricePoint = this.get("pricePoint") || [
    DEFAULT_COORDS[1],
    DEFAULT_COORDS[0],
  ];

  docs.forEach((doc) => {
    doc.deliveryPrice = calcDeliveryPrice(
      [doc.address.coordinates[1], doc.address.coordinates[0]],
      pricePoint
    );
  });

  next();
});

cleanupModel("Business");

const Business: Model<BusinessDTO> =
  models.Business || model<BusinessDTO>("Business", BusinessSchema);

export default Business;
