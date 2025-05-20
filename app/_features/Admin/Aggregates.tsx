import { AdminAggregatesDTO } from "@/app/_interfaces/interfaces";
import LocalIcons from "@/app/_utils/LocalIcons";
import OrderItem from "./OrderItem";
import ThreeTabs from "./ThreeTabs";
import { GetAdminAggregatesAction } from "@/app/_lib/admin/actions";

async function Aggregates() {
  let aggregates: AdminAggregatesDTO | null;
  try {
    aggregates = await GetAdminAggregatesAction();
  } catch (err) {
    console.error(err);
    aggregates = null;
  }

  if (!aggregates) return <div>Error While Loading Aggregates</div>;

  const {
    activeOrders = [],
    totalOrders = 0,
    totalDeliveriesMade = 0,
    totalItemsDelivered = 0,
    averageDeliveredItemPrice = 0,
    totalDeliveryPrice = 0,
    totalDeliveredItemPrice = 0,
  } = aggregates;
  const hasActiveOrders = activeOrders.length > 0;

  return (
    <div className="grow flex flex-col items-center">
      <div className="grow flex flex-col gap-3 w-full max-w-screen-sm px-4 items-center justify-between">
        <div className="grow flex flex-col  min-h-14 w-full bg-phthaloGreen/10 rounded-2xl p-3">
          <p className="text-phthaloGreen text-xl font-extrabold">
            Active Orders {hasActiveOrders ? `x ${activeOrders.length}` : ""}
          </p>
          {hasActiveOrders ? (
            <div className="max-h-[calc(100dvh-448px)] overflow-y-auto text-sm text-stone-500 flex flex-col bg-white bg-opacity-[0.74] rounded-[18px] px-3">
              {activeOrders.map((order) => (
                <OrderItem key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <div className="grow flex flex-col items-center justify-center">
              <LocalIcons name="empty-cart" />
              <p className="text-sm font-bold text-center text-phthaloGreen text-opacity-[0.37]">
                No Active Orders
              </p>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col gap-3">
          <ThreeTabs
            tabs={[
              {
                title: "Total Deliveries Made",
                text: `${totalDeliveriesMade}/${totalOrders}`,
              },
              {
                title: "Total Items Delivered",
                text: String(totalItemsDelivered),
              },
              {
                title: "Average Item Price",
                text: `₦${Math.round(averageDeliveredItemPrice)}`,
              },
            ]}
          />
          <div className="w-full flex flex-col bg-green-500 rounded-2xl p-3">
            <p className="text-white text-xl font-extrabold">
              Gross Delivery Profit
            </p>
            <div className="text-green-500  flex flex-col bg-white bg-opacity-[0.74] rounded-[18px] p-3">
              <p className="text-base font-bold">₦{totalDeliveryPrice}</p>
            </div>
          </div>
          <div className="w-full flex flex-col bg-teal-500 rounded-2xl p-3">
            <p className="text-white text-xl font-extrabold">Gross Revenue</p>
            <div className="text-teal-500 flex flex-col bg-white bg-opacity-[0.74] rounded-[18px] p-3">
              <p className="text-base font-bold">₦{totalDeliveredItemPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aggregates;
