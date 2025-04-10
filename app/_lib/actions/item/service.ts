import { BusinessDTO, ItemDTO } from "@/app/_interfaces/interfaces";
import Item from "../../models/item/model";
import { auth } from "../auth/auth";
import { connect } from "../../db";
import Business from "../../models/business/model";
import slugify from "slugify";

export async function createItems({
  items,
  businessId,
}: {
  items: Pick<ItemDTO, "name" | "image" | "price" | "itemType">[];
  businessId: BusinessDTO["id"];
}) {
  const session = await auth();
  const user = session?.user;
  if (!user) throw new Error("Log in to create an Item.");
  //   Should also check user's role in this organisation - later ABAC
  if (!businessId)
    throw new Error("You are unable to create an item for this organisation.");

  await connect();

  const { items: strictItemsData, itemTypes } = items.reduce<{
    items: Pick<
      ItemDTO,
      "name" | "image" | "price" | "itemType" | "businessData" | "slug"
    >[];
    itemTypes: string[];
  }>(
    (acc, item) => {
      acc.items.push({
        ...item,
        businessData: businessId,
        slug: slugify(item.name),
      });
      if (!acc.itemTypes.includes(item.itemType)) {
        acc.itemTypes.push(item.itemType);
      }
      return acc;
    },
    { items: [], itemTypes: [] }
  );

  const newItem = await Item.insertMany(strictItemsData);

  await Business.updateOne(
    { _id: businessId },
    {
      $addToSet: {
        businessTypes: { $each: itemTypes },
      },
    },
    { new: true }
  );

  return newItem;
}
