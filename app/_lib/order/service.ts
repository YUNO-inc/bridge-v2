import { OrderDTO } from "@/app/_interfaces/interfaces";
import { auth } from "../actions/auth/auth";
import Order from "./model";

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
      "We would not be able to find you yet. Please add or select an address"
    );
  const selectedAddress = user.addresses?.find?.((a) => a.isSelected);
  if (!selectedAddress)
    throw new Error(
      "Which address would we find you? Please select one of your addresses."
    );

  const { items, businesses } = order;
  const createdOrder = await Order.create({ user: user.id, items, businesses });

  return createdOrder;
}
