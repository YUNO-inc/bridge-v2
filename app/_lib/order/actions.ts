"use server";

import { OrderDTO } from "@/app/_interfaces/interfaces";
import { checkout, getOrder, updateOrderStatus } from "./service";
import { serializeMongoDocument } from "../utils/helpers";

export async function CheckoutAction(
  order: Pick<OrderDTO, "items" | "businesses">
): Promise<OrderDTO> {
  try {
    const createdOrder = await checkout(order);
    return createdOrder;
  } catch (error) {
    const err = error as Error;
    throw new Error(
      err.message ||
        "We found some issues while processing your checkout. Please make sure you are signed in and have a selected address and phone number."
    );
  }
}

export async function GetOrderAction(orderId: OrderDTO["id"]) {
  try {
    const order = await getOrder(orderId);
    return serializeMongoDocument(order);
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message || "We are unable to find this order");
  }
}

export async function UpdateOrderStatusAction(
  orderId: OrderDTO["id"],
  orderStatus: OrderDTO["status"]
) {
  await updateOrderStatus(orderId, orderStatus);
}
