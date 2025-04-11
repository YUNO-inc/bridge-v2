import { BusinessDTO, DEFAULT_GEOJSON } from "@/app/_interfaces/interfaces";
import { connect } from "../../db";
import Business from "../../models/business/model";
import { auth } from "../auth/auth";
import slugify from "slugify";

export async function createBusiness(
  business: Pick<BusinessDTO, "name" | "address" | "profileImg">
) {
  const session = await auth();
  const user = session?.user;
  if (!user) throw new Error("Log in to create a business.");

  await connect();
  const newBusiness = await Business.create({
    name: business.name,
    owner: user.id,
    address: business.address,
    profileImg: business.profileImg,
    slug: slugify(business.name, { lower: true }),
  });
  return newBusiness;
}

export async function getSingleBusiness(queryData: Partial<BusinessDTO>) {
  const business = await Business.findOne(queryData).populate(
    "recommendations"
  );
  return business;
}

export async function getMultipleBusinesses(queryData: Partial<BusinessDTO>) {
  const businesses = await Business.find(queryData).populate("recommendations");
  return businesses;
}

export async function getNearBusinesses(
  coords: BusinessDTO["address"]["coordinates"]
): Promise<BusinessDTO[]> {
  const businesses = await Business.find({
    address: {
      $near: {
        $geometry: {
          type: DEFAULT_GEOJSON,
          coordinates: coords,
        },
      },
    },
  }).populate("recommendations");
  return businesses;
}
