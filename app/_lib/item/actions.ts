"use server";

import { AddressDTO, BusinessDTO, ItemDTO } from "@/app/_interfaces/interfaces";
import { createItems, getItems } from "./service";
import { serializeMongoDocument } from "../utils/helpers";

export async function CreateItemsAction({
  items,
  businessId,
}: {
  items: Pick<ItemDTO, "name" | "image" | "price" | "itemType">[];
  businessId: BusinessDTO["id"];
}): Promise<ItemDTO[]> {
  try {
    const newItems = await createItems({ items, businessId });
    return serializeMongoDocument(newItems);
  } catch (err) {
    console.error(err);
    throw new Error(
      "Unable to create items. Please make sure you are logged in properly and try again."
    );
  }
}

export async function GetItemsAction(
  searchStr?: ItemDTO["name"],
  coords?: AddressDTO["coordinates"]
): Promise<ItemDTO[]> {
  try {
    const newItems = await getItems(searchStr, coords);
    return serializeMongoDocument(newItems);
  } catch (err) {
    console.error(err);
    throw new Error(
      "Could not find these items at the moment. Please try again in a bit."
    );
  }
}
