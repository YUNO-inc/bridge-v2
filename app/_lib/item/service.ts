import { AddressDTO, BusinessDTO, ItemDTO } from "@/app/_interfaces/interfaces";
import Item from "./model";
import { auth } from "../auth/auth";
import { connect } from "../db";
import Business from "../business/model";
import slugify from "slugify";
import Fuse from "fuse.js";
import { sortItemsByCloseness } from "@/app/_utils/helpers";

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
        slug: slugify(item.name, { lower: true }),
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

export async function getSingleItem({
  itemId,
  itemSlug,
  businessSlug,
}: {
  itemId?: ItemDTO["id"];
  itemSlug: ItemDTO["slug"];
  businessSlug: BusinessDTO["slug"];
}) {
  let item;
  if (itemId?.length) item = await Item.findById(itemId);
  else {
    const items = await Item.find({ slug: itemSlug }).populate("businessData");
    item =
      items.find(
        (item) =>
          typeof item?.businessData !== "string" &&
          item?.businessData?.slug?.toLowerCase?.() ===
            businessSlug.toLowerCase()
      ) || null;
  }

  return item;
}

export async function getItems(
  searchStr?: ItemDTO["name"],
  coords?: AddressDTO["coordinates"],
  findBy: Partial<ItemDTO> = {}
): Promise<ItemDTO[]> {
  let items = await Item.find(findBy).populate({
    path: "businessData",
    select: "-recommendations",
    options: { pricePoint: coords },
  });

  if (searchStr) {
    const fuse = new Fuse(items, { keys: ["name"], threshold: 0.5 });
    items = fuse.search(searchStr).map((r) => r.item);
  }

  return coords?.length === 2 ? sortItemsByCloseness(coords, items) : items;
}
