import PageBackLinkClient from "@/app/_features/Button/PageBackLinkClient";
import OrderMap from "@/app/_features/Map/Order/OrderMap";
import { NarrowOrderDTO } from "@/app/_interfaces/interfaces";
import { GetOrderAction } from "@/app/_lib/order/actions";

async function Page({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  let order: NarrowOrderDTO | undefined;
  try {
    order = await GetOrderAction(orderId);
  } catch (error) {
    console.error(error);
    order = undefined;
  }

  if (!order) return <div>No order with this id {orderId}</div>;

  return (
    <div className="flex flex-col min-h-[100svh]  bg-black-50">
      <PageBackLinkClient className="absolute top-0 left-0 z-[99999] shadow-sgc rounded-full m-4 p-0.5 bg-white text-opacity-60" />
      <OrderMap order={order} />
    </div>
  );
}

export default Page;
