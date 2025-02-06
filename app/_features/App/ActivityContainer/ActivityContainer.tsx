"use client";

import { motion, useMotionValue } from "motion/react";
import { useState } from "react";
import PageControl from "../../PageControl/PageControl";
import ActivityControlsSegmentedControl from "../ActivityControlsSegmentedControl";
import CartButton from "../Cart/CartButton";
import DefaultItem from "../DefaultItem/DefaultItem";
import { BusinessDTO, CartDTO } from "@/app/_interfaces/interfaces";

const cartItems: CartDTO = [
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
  const businesses: BusinessDTO[] = [
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
    <div className="w-full flex flex-col gap-2">
      <div className="relative w-full flex justify-center items-center overflow-hidden">
        <motion.div
          animate={{
            translateX: `calc((${pageIndex} * -100%) - ${
              pageIndex > 0 ? "16px" : "0px"
            })`,
          }}
          transition={{ type: "spring", mass: 3, stiffness: 400, damping: 50 }}
          className="flex w-full gap-4 sw700:h-[60dvh] h-[50dvh] max-h-[63.7dvh] min-h-[400px] active:cursor-grabbing"
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
              <DefaultItem key={business.name} business={business} />
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
      <ActivityControlsSegmentedControl />
    </div>
  );
}

export default ActivityContainer;
