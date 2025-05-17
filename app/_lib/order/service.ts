import { OrderDTO } from "@/app/_interfaces/interfaces";
import Order from "./model";
import { auth } from "../auth/auth";
import "@/app/_lib/item/model";
import Item from "@/app/_lib/item/model";
import Business from "../business/model";
import {
  getTotalDeliveryPrice,
  sortByFarthestPoint,
} from "@/app/_utils/helpers";

export async function checkout(
  order: Pick<OrderDTO, "items" | "businesses">
): Promise<OrderDTO> {
  const session = await auth();
  const user = session?.user;

  if (!user?.id)
    throw new Error(
      "You're almost there!, please sign in to place your order."
    );
  if (!user.phoneNumber)
    throw new Error(
      "We can't contact you yet!, Please Add a phone number. Or reload the page and try again if you alreeady added one."
    );
  if (!user.addresses?.length)
    throw new Error(
      "We would not be able to locate you. Please add or select an address"
    );
  const selectedAddress = user.addresses?.find?.((a) => a.isSelected);
  if (!selectedAddress)
    throw new Error(
      "Which address would we find you? Please select one of your addresses."
    );

  const { items: itemIds, businesses: businessIds } = order;
  const items = await Item.find({ _id: itemIds });
  const businesses = await Business.find({ _id: businessIds });

  const foundBusinessIds = businesses.map((business) => business.id);
  businessIds.forEach((id) => {
    if (!foundBusinessIds.includes(id))
      throw new Error(
        `Could Not Find a business with this id in our database ${id}`
      );
  });

  const farthestAddress = sortByFarthestPoint(
    selectedAddress,
    businesses.map((b) => b.address)
  )[0];
  const farthestPurchase = businesses.find(
    (b) => b.address.id === farthestAddress.id
  )?.id;

  const totalItemPrice = itemIds.reduce((acc, id) => {
    const item = items.find((i) => i.id === id);
    if (!item)
      throw new Error(
        `Could Not Find an item with this id in our database ${id}`
      );
    const itemPrice = item.price;
    return acc + itemPrice;
  }, 0);
  const totalDeliveryPrice = getTotalDeliveryPrice(
    businesses.map((b) => b.address),
    farthestAddress,
    selectedAddress
  );

  const createdOrder = new Order({
    user: user.id,
    items: itemIds,
    businesses: businessIds,
    farthestPurchase,
    totalItemPrice,
    totalDeliveryPrice,
  });
  await createdOrder.save();
  await createdOrder.populate("items");

  const numOfItems = createdOrder.items.length;
  const numOfBusinesses = createdOrder.businesses.length;

  if (process.env.NODE_ENV !== "development")
    await fetch("https://ntfy.sh/bridge-order-alert", {
      method: "POST",
      headers: {
        Title: "New Order",
        Priority: "urgent",
        Tags: "fire,bike",
        Click: `https://bridgeinc.ng/admin/order/${createdOrder.id}`,
      },
      body: `New order of ${numOfItems} ${
        numOfItems < 2 ? "item" : "items"
      } from ${numOfBusinesses} ${
        numOfBusinesses < 2 ? "business" : "businesses"
      }`,
    });

  return createdOrder;
}
