import { OrderDTO } from "@/app/_interfaces/interfaces";
import { checkout } from "./service";

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
