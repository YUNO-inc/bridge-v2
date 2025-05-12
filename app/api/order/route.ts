import { OrderDTO } from "@/app/_interfaces/interfaces";
import { CheckoutAction } from "@/app/_lib/order/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { order }: { order: Pick<OrderDTO, "items" | "businesses"> } = body;
    const createdOrder = await CheckoutAction(order);
    return NextResponse.json(
      { success: true, order: createdOrder },
      { status: 201 }
    );
  } catch (error) {
    const err = error as Error;
    console.error(err.message);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 401 }
    );
  }
}
