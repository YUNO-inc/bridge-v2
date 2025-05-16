import Link from "next/link";
import PageBackLink from "../_features/Button/PageBackLink";
import { MapPin, MoneyWavy, Package } from "@phosphor-icons/react/dist/ssr";
import IconAndText from "../_features/Cart/IconAndText";
import LocalIcons from "../_utils/LocalIcons";
import { BusinessDTO } from "../_interfaces/interfaces";

async function Page() {
  let aggregates: BusinessDTO | null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin`);
    aggregates = await res.json();
  } catch {
    aggregates = null;
  }

  console.log(aggregates);

  if (!aggregates) return <div>Error While Loading Aggregates</div>;

  return (
    <div className="flex flex-col min-h-[100svh] py-4 text-xl">
      <PageBackLink text="Admin" className="mb-10" />
      <div className="grow flex flex-col items-center">
        <div className="grow flex flex-col gap-3 w-full max-w-screen-sm px-4 items-center justify-between">
          <div className="grow flex flex-col  min-h-14 w-full bg-phthaloGreen/10 rounded-2xl p-3">
            <p className="text-phthaloGreen text-xl font-extrabold">
              Active Orders x 3
            </p>
            {/* <div className="text-sm text-stone-500 flex flex-col bg-white bg-opacity-[0.74] rounded-[18px] px-3">
              <OrderItem />
              <OrderItem />
            </div> */}
            <div className="grow flex flex-col items-center justify-center">
              <LocalIcons name="empty-cart" />
              <p className="text-sm font-bold text-stone-500">
                No Active Orders
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <div className="max-w-full overflow-hidden flex justify-between gap-2">
              <div
                className="text-center basis-[30%] max-w-[30%] bg-slate-500/10 text-slate-500 p-2 rounded-xl"
                title="Total Deliveries"
              >
                <p className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                  Total Deliveries
                </p>
                <p className="text-base font-bold">300</p>
              </div>
              <div
                className="text-center basis-[30%] max-w-[30%] bg-slate-500/10 text-slate-500 p-2 rounded-xl"
                title="Total Order Value"
              >
                <p className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                  T.O.V
                </p>
                <p className="text-base font-bold">₦3000</p>
              </div>
              <div
                className="text-center basis-[30%] max-w-[30%] bg-slate-500/10 text-slate-500 p-2 rounded-xl"
                title="Average Order Value"
              >
                <p className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                  A.O.V
                </p>
                <p className="text-base font-bold">₦3000</p>
              </div>
            </div>
            <div className="w-full flex flex-col bg-green-500 rounded-2xl p-3">
              <p className="text-white text-xl font-extrabold">
                Gross Delivery Profit
              </p>
              <div className="text-green-500  flex flex-col bg-white bg-opacity-[0.74] rounded-[18px] p-3">
                <p className="text-base font-bold">₦3000</p>
              </div>
            </div>
            <div className="w-full flex flex-col bg-teal-500 rounded-2xl p-3">
              <p className="text-white text-xl font-extrabold">Gross Revenue</p>
              <div className="text-teal-500 flex flex-col bg-white bg-opacity-[0.74] rounded-[18px] p-3">
                <p className="text-base font-bold">₦3000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderItem() {
  return (
    <Link
      href={"#"}
      className="border border-transparent border-opacity-[0.1] border-b-phthaloGreen last:border-b-transparent py-3"
    >
      <p>
        <span className="font-bold">3</span> <span>items</span> {"from "}
        <span className="font-bold">{"two "}</span> <span>businesses</span>
      </p>
      <p className="flex gap-2 items-center font-bold">
        <span className="max-w-[50%] flex gap-1 items-center">
          <Package className="w-5 h-5" />
          <span className="max-w-[90%] overflow-hidden whitespace-nowrap text-ellipsis">
            Premium Sharwarma
          </span>
        </span>
        <span className="max-w-[50%] flex gap-1 items-center">
          <MapPin className="w-5 h-5" />
          <span className="max-w-[90%] overflow-hidden whitespace-nowrap text-ellipsis">
            9, Esuola street Oshodi
          </span>
        </span>
      </p>
      <div className="text-stone-600 pt-3 flex items-center gap-6">
        <IconAndText
          icon={
            <LocalIcons
              name="rider"
              className="w-3 h-3 fill-transparent"
              pathClassName={[
                "fill-current fill-opacity-[0.3] ",
                "stroke-current stroke-opacity-[0.3] ",
              ]}
            />
          }
          text={`₦${200}`}
        />
        <IconAndText
          icon={<MoneyWavy className="w-3.5 h-3.5 fill-current" />}
          text={`₦${1100}`}
        />
      </div>
    </Link>
  );
}

export default Page;

// Write a mongoDB / Mongoose aggreate query to a `Order` Model.
// This aggragation should do the following values
// 1. Get all the orders
// 2.  Populate the `user` field (which is an objectID for documents in a users collection) on each document
// 3. Populate the FPI field (which is an objectID for documents in a fpis collection)
// 4. Store the length of the orders in a field `totalOrders`
// 5. Store the length of the orders with a status of `delivered` in a field `totalDeliveries`
// 6. Store the sum of the `price` fields of all documents with a status of `delivered` in a field `totalOrderValue`
// 7. Store the average of the `totalOrderValue` in a field `averageOrderValue`
