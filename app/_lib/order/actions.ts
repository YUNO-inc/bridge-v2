import { OrderDTO } from "@/app/_interfaces/interfaces";
import { checkout } from "./service";

export async function CheckoutAction(
  order: Pick<OrderDTO, "items" | "businesses">
): Promise<OrderDTO> {
  const createdOrder = checkout(order);
  return createdOrder;
}
