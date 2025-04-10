"use server";

import { BusinessDTO, ItemDTO } from "@/app/_interfaces/interfaces";
import { createItems } from "./service";
import { serializeMongoDocument } from "../../utils/helpers";

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
    console.log(err);
    throw new Error(
      "Unable to create items. Please make sure you are logged in properly and try again."
    );
  }
}
