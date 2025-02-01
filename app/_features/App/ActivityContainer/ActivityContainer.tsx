"use client";

import { motion, useMotionValue } from "motion/react";
import { useState } from "react";
import PageControl from "../../PageControl/PageControl";
import LocalIcons from "@/app/_utils/LocalIcons";
import Image from "next/image";
import { PlusIcon } from "@heroicons/react/16/solid";

type BusinessI = {
  name: string;
  location: string;
  deliveryPrice: number;
  profile: string;
  isOpen: boolean;
  recommendations: { image: string; name: string; price: number }[];
};

const cartItems: BusinessI[] = [
  {
    name: "witty shawarma",
    location: "Ago Okota",
    deliveryPrice: 200,
    profile: "witty-sha.jpg",
    isOpen: true,
    recommendations: [
      { image: "witty-sha.jpg", name: "chicken shawarma", price: 2000 },
      { image: "witty-sha.jpg", name: "turkey shawarma", price: 2000 },
      {
        image: "witty-sha.jpg",
        name: "Double Roasted shawarma",
        price: 2000,
      },
      { image: "witty-sha.jpg", name: "Pork shawarma", price: 2000 },
    ],
  },
];

function ActivityContainer({ currPageIndex = 0 }) {
  const MAX_PAGE_INDEX = 1;
  const DRAG_BUFFER = 33;
  const [pageIndex, setPageIndex] = useState(currPageIndex);
  const dragX = useMotionValue(0);
  const businesses: BusinessI[] = [
    {
      name: "witty shawarma",
      location: "Ago Okota",
      deliveryPrice: 200,
      profile: "witty-sha.jpg",
      isOpen: true,
      recommendations: [
        { image: "witty-sha.jpg", name: "chicken shawarma", price: 2000 },
        { image: "witty-sha.jpg", name: "turkey shawarma", price: 2000 },
        {
          image: "witty-sha.jpg",
          name: "Double Roasted shawarma",
          price: 2000,
        },
        { image: "witty-sha.jpg", name: "Pork shawarma", price: 2000 },
      ],
    },
    {
      name: "Premium shawarma",
      location: "Century, Ago",
      deliveryPrice: 300,
      profile: "witty-sha.jpg",
      isOpen: false,
      recommendations: [
        { image: "witty-sha.jpg", name: "chicken shawarma", price: 2000 },
        { image: "witty-sha.jpg", name: "turkey shawarma", price: 2000 },
        {
          image: "witty-sha.jpg",
          name: "Double Roasted shawarma",
          price: 2000,
        },
        { image: "witty-sha.jpg", name: "Pork shawarma", price: 2000 },
      ],
    },
    {
      name: "witty shawarma 2",
      location: "Ago Okota",
      deliveryPrice: 200,
      profile: "witty-sha.jpg",
      isOpen: true,
      recommendations: [
        { image: "witty-sha.jpg", name: "chicken shawarma", price: 2000 },
        { image: "witty-sha.jpg", name: "turkey shawarma", price: 2000 },
        {
          image: "witty-sha.jpg",
          name: "Double Roasted shawarma",
          price: 2000,
        },
        { image: "witty-sha.jpg", name: "Pork shawarma", price: 2000 },
      ],
    },
    {
      name: "Premium shawarma 2",
      location: "Century, Ago",
      deliveryPrice: 300,
      profile: "witty-sha.jpg",
      isOpen: true,
      recommendations: [
        { image: "witty-sha.jpg", name: "chicken shawarma", price: 2000 },
        { image: "witty-sha.jpg", name: "turkey shawarma", price: 2000 },
        {
          image: "witty-sha.jpg",
          name: "Double Roasted shawarma",
          price: 2000,
        },
        { image: "witty-sha.jpg", name: "Pork shawarma", price: 2000 },
      ],
    },
  ];

  const onDragEnd = () => {
    const x = dragX.get();
    if (x <= -DRAG_BUFFER && pageIndex < MAX_PAGE_INDEX) {
      setPageIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && pageIndex > 0) {
      setPageIndex((pv) => pv - 1);
    }
  };

  return (
    <div className="w-full">
      <div className="relative w-full flex justify-center items-center overflow-hidden">
        <motion.div
          animate={{
            translateX: `calc((${pageIndex} * -100%) - ${
              pageIndex > 0 ? "16px" : "0px"
            })`,
          }}
          transition={{ type: "spring", mass: 3, stiffness: 400, damping: 50 }}
          className="flex w-full gap-4 h-[400px] max-h-[63.7dvh] min-h-72 active:cursor-grabbing"
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={onDragEnd}
            style={{ x: dragX }}
            className={`bg-[#f2f2f2] h-full shrink-0 w-full rounded-[25px] overflow-x-hidden overflow-y-auto p-2 flex flex-col gap-4 ${
              cartItems.length && "pb-[90px]"
            }`}
          >
            {businesses.map((business) => (
              <DefaultActivityItem key={business.name} business={business} />
            ))}
          </motion.div>
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={onDragEnd}
            style={{ x: dragX }}
            className="bg-[#f2f2f2] h-full shrink-0 w-full rounded-[25px] overflow-hidden"
          ></motion.div>
        </motion.div>
        <div className="absolute w-full left-1/2 translate-x-[-50%] bottom-2 px-2 flex flex-col gap-1 items-center z-10">
          <PageControl
            numOptions={2}
            activeIndex={pageIndex}
            setActiveIndex={setPageIndex}
            className={!cartItems.length ? "shadow-sgc" : ""}
          />
          {cartItems.length && <CartButton />}
        </div>
      </div>
    </div>
  );
}

function DefaultActivityItem({ business }: { business: BusinessI }) {
  return (
    <button className="flex flex-col gap-2 w-full bg-stone-800 bg-opacity-5 rounded-[13px] p-3 text-stone-800">
      <div className="flex items-center justify-between w-full text-sm">
        <div className="relative w-9 h-9 rounded-full overflow-hidden mr-3">
          <Image
            src={`/images/${business.profile}`}
            alt={`${business.name} Profile Image`}
            className="object-cover"
            fill
          />
        </div>
        <div className="grow text-left">
          <div className="text-[15px] font-semibold capitalize overflow-hidden whitespace-nowrap text-ellipsis">
            {business.name}
          </div>
          <div className="space-x-3">
            <span>{business.location}</span>
            <span className="border-r border-r-phthaloGreen border-opacity-40"></span>
            <span className="text-stone-800 text-opacity-60">
              {business.isOpen ? "Open" : "Closed"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="font-semibold">₦{business.deliveryPrice}</div>
          <span className="relative bottom-[1px]">
            <LocalIcons
              name="rider2"
              className="w-[14px] h-[14px] fill-transparent"
              pathClassName={["fill-stone-800", "stroke-stone-800"]}
            />
          </span>
        </div>
      </div>
      {business.recommendations.length && (
        <div className="flex space-x-3 items-center w-full overflow-auto">
          {business.recommendations.map((rec) => (
            <div
              key={rec.name}
              role="button"
              className="bg-stone-800 bg-opacity-10 py-2 px-2 rounded-[7px] flex items-center gap-2 text-sm"
            >
              <div className="relative shrink-0 w-12 h-12 rounded-[4px] overflow-hidden">
                <Image
                  src={`/images/${rec.image}`}
                  fill
                  className="object-cover"
                  alt={`Image of ${rec.name} by ${business.name}`}
                />
                <div className="absolute h-[30%] w-full bg-stone-800 bg-opacity-[0.1] backdrop-blur-[1px] z-10 bottom-0 left-0 rounded-b-[4px] flex items-center justify-center border-t-[1px] border-t-phthaloGreen border-opacity-[0.37]">
                  <PlusIcon className="fill-phthaloGreen w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex flex-col justify-between text-left">
                <p className="w-max max-w-[170px]">{rec.name}</p>
                <p>₦{rec.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </button>
  );
}

function CartButton() {
  return (
    <button className="bg-phthaloGreen text-phthaloGreen-50 backdrop-blur-md text-sm px-4 py-4 w-full flex items-center justify-between rounded-[16px] shadow-sgc">
      <span>Cart</span>
      <span className="flex items-center gap-[6px] text-[13px]">
        <span>2 items</span>
        <span className="w-1 h-1 bg-phthaloGreen-50 bg-opacity-55 rounded-full"></span>
        <span className="flex gap-1">
          <span>₦400</span>
          <span className="relative bottom-[-2px]">
            <LocalIcons
              name="rider2"
              className="w-[14px] h-[14px] fill-transparent"
              pathClassName={["fill-phthaloGreen-50", "stroke-phthaloGreen-50"]}
            />
          </span>
        </span>
      </span>
    </button>
  );
}

export default ActivityContainer;
