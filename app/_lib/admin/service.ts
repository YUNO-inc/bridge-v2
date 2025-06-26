import { getADMIN_IDS } from "@/app/_utils/helpers";
import { auth } from "../auth/auth";
import Order from "../order/model";
import { adminPipeline } from "./pipelines";
import { AdminAggregatesDTO } from "@/app/_interfaces/interfaces";
// import slugify from "slugify";
// import Item from "../item/model";

export async function getAdminAggregates(): Promise<AdminAggregatesDTO> {
  const session = await auth();
  const user = session?.user;
  const ADMIN_IDS = getADMIN_IDS();

  if (process.env.NODE_ENV !== "development") {
    if (!user || !ADMIN_IDS.includes(user.id || ""))
      throw new Error("Unathorised access");
  }

  const [adminAggregates] = await Order.aggregate(adminPipeline).exec();

  return adminAggregates;
}

// function createMultipleItems(
//   itemData: { name: string; price: number; businessData: string }[]
// ) {
//   const items = itemData.map(({ name, price, businessData }) => {
//     const slug = slugify(name, { lower: true });
//     return {
//       name,
//       image: `https://bridge-version-2.s3.eu-west-2.amazonaws.com/kamen-healthcare-${slug}.jpg`,
//       price,
//       slug,
//       businessData,
//       createdAt: Date.now(),
//     };
//   });

// Item.insertMany(items)
//   .then((res) => console.log("Inserted:", res))
//   .catch((err) => console.error(err));
// console.log(process.env);
// }

// createMultipleItems([
//   {
//     name: "Emzolyn Cough Syrup (Children)",
//     price: 17600,
//     businessData: "6849c5dd06f9b020bc02ff19",
//   },
//   {
//     name: "Allergin Syrup 60mls",
//     price: 1500,
//     businessData: "6849c5dd06f9b020bc02ff19",
//   },
//   {
//     name: "Aristobet-N",
//     price: 3900,
//     businessData: "6849c5dd06f9b020bc02ff19",
//   },
//   {
//     name: "Atadyn Syrup",
//     price: 2900,
//     businessData: "6849c5dd06f9b020bc02ff19",
//   },
//   {
//     name: "Atadyn Tablets",
//     price: 1300,
//     businessData: "6849c5dd06f9b020bc02ff19",
//   },
//   {
//     name: "Cetrizine 10mg(Zirtek) 1x21tab",
//     price: 1800,
//     businessData: "6849c5dd06f9b020bc02ff19",
//   },
//   {
//     name: "Chlopheniramine 4mg(2)",
//     price: 150,
//     businessData: "6849c5dd06f9b020bc02ff19",
//   },
//   {
//     name: "Evans Baroque Piriton Syrup 60m",
//     price: 2000,
//     businessData: "6849c5dd06f9b020bc02ff19",
//   },
//   {
//     name: "Loratyn-10( per sachet)",
//     price: 150,
//     businessData: "6849c5dd06f9b020bc02ff19",
//   },
//   {
//     name: "MIXAGRIP COLD CAPLET",
//     price: 800,
//     businessData: "6849c5dd06f9b020bc02ff19",
//   },
//   {
//     name: "PROMETHAZINE (ROPHEGAN) ELIXIR",
//     price: 1400,
//     businessData: "6849c5dd06f9b020bc02ff19",
//   },
//   {
//     name: "LICORICE ROOT DARK SPOT SERUM",
//     price: 24600,
//     businessData: "6849c5dd06f9b020bc02ff19",
//   },
//   {
//     name: "GREEN TEA BLEMISH CONTROL SERUM",
//     price: 16000,
//     businessData: "6849c5dd06f9b020bc02ff19",
//   },
//   {
//     name: "GREEN TEA REVITALISING CLEANSER",
//     price: 12000,
//     businessData: "6849c5dd06f9b020bc02ff19",
//   },
//   {
//     name: "ALOE INVISIBLE SUNSCREEN",
//     price: 20640,
//     businessData: "6849c5dd06f9b020bc02ff19",
//   },
//   {
//     name: "ALWAYS ULTRA PAD (PINK)",
//     price: 2500,
//     businessData: "6849c5dd06f9b020bc02ff19",
//   },
//   {
//     name: "Emzor Paracetamol Tablets",
//     price: 550,
//     businessData: "6849c5dd06f9b020bc02ff19",
//   },
//   {
//     name: "PARACETAMOL SYRUP 60ML",
//     price: 1200,
//     businessData: "6849c5dd06f9b020bc02ff19",
//   },
//   {
//     name: "Panadol Extra",
//     price: 1000,
//     businessData: "6849c5dd06f9b020bc02ff19",
//   },
//   {
//     name: "PANADOL PAIN & FEVER",
//     price: 1200,
//     businessData: "6849c5dd06f9b020bc02ff19",
//   },
//   {
//     name: "ROBB BALM",
//     price: 1000,
//     businessData: "6849c5dd06f9b020bc02ff19",
//   },
//   {
//     name: "Vigor Chocolate",
//     price: 5320,
//     businessData: "6849c5dd06f9b020bc02ff19",
//   },
//   {
//     name: "Supermag Antacid",
//     price: 2500,
//     businessData: "6849c5dd06f9b020bc02ff19",
//   },
//   {
//     name: "gestid suspension",
//     price: 3500,
//     businessData: "6849c5dd06f9b020bc02ff19",
//   },
//   {
//     name: "PREGNANCY TEST STRIP",
//     price: 300,
//     businessData: "6849c5dd06f9b020bc02ff19",
//   },
//   {
//     name: "Postinor 2 Emergency",
//     price: 4000,
//     businessData: "6849c5dd06f9b020bc02ff19",
//   },
//   {
//     name: "Astymin Tonic",
//     price: 7300,
//     businessData: "6849c5dd06f9b020bc02ff19",
//   },
//   // {
//   //   name: "",
//   //   price: 0,
//   //   businessData: "6849c5dd06f9b020bc02ff19",
//   // },
//   // {
//   //   name: "",
//   //   price: 0,
//   //   businessData: "6849c5dd06f9b020bc02ff19",
//   // },
//   // {
//   //   name: "",
//   //   price: 0,
//   //   businessData: "6849c5dd06f9b020bc02ff19",
//   // },
//   // {
//   //   name: "",
//   //   price: 0,
//   //   businessData: "6849c5dd06f9b020bc02ff19",
//   // },
//   // {
//   //   name: "",
//   //   price: 0,
//   //   businessData: "6849c5dd06f9b020bc02ff19",
//   // },
//   // {
//   //   name: "",
//   //   price: 0,
//   //   businessData: "6849c5dd06f9b020bc02ff19",
//   // },
//   // {
//   //   name: "",
//   //   price: 0,
//   //   businessData: "6849c5dd06f9b020bc02ff19",
//   // },
// ]);
