"use client";

import { motion, useMotionValue } from "motion/react";
import { useState } from "react";
import PageControl from "../../PageControl/PageControl";
import ActivityControlsSegmentedControl from "../ActivityControlsSegmentedControl";
import CartButton from "../../Cart/CartButton";
import DefaultItem from "../DefaultItem/DefaultItem";
import { BusinessDTO } from "@/app/_interfaces/interfaces";
import { useAppSelector } from "@/app/_hooks/reduxHooks";
import { getCart } from "../../Cart/cartSlice";
import Cart from "../../Cart/Cart";

function ActivityContainer({ currPageIndex = 0 }) {
  const { numTotalItems } = useAppSelector(getCart);
  const MAX_PAGE_INDEX = 1;
  const DRAG_BUFFER = 33;
  const [pageIndex, setPageIndex] = useState(currPageIndex);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const dragX = useMotionValue(0);
  const businesses: BusinessDTO[] = [
    {
      id: "1",
      name: "witty shawarma",
      location: "Ago Okota",
      deliveryPrice: 200,
      profile: "witty-sha.jpg",
      isOpen: true,
      recommendations: [
        {
          id: "item01",
          ownerData: {
            id: "1",
            name: "witty shawarma",
            deliveryPrice: 200,
          },
          image: "witty-sha.jpg",
          name: "chicken shawarma",
          price: 3000,
          addedAt: new Date(1740738322952),
        },
        {
          id: "item02",
          ownerData: {
            id: "1",
            name: "witty shawarma",
            deliveryPrice: 200,
          },
          image: "witty-sha.jpg",
          name: "turkey shawarma",
          price: 5000,
          addedAt: new Date(1740738522952),
        },
        {
          id: "item03",
          ownerData: {
            id: "1",
            name: "witty shawarma",
            deliveryPrice: 200,
          },
          image: "witty-sha.jpg",
          name: "Double Roasted shawarma",
          price: 9000,
          addedAt: new Date(1740738922152),
        },
        {
          id: "item04",
          ownerData: {
            id: "1",
            name: "witty shawarma",
            deliveryPrice: 200,
          },
          image: "witty-sha.jpg",
          name: "Pork shawarma",
          price: 4000,
          addedAt: new Date(1740738422952),
        },
      ],
    },
    {
      id: "2",
      name: "Premium shawarma",
      location: "Century, Ago",
      deliveryPrice: 300,
      profile: "witty-sha.jpg",
      isOpen: false,
      recommendations: [
        {
          id: "item05",
          ownerData: {
            id: "2",
            name: "Premium shawarma",
            deliveryPrice: 300,
          },
          image: "witty-sha.jpg",
          name: "chicken shawarma",
          price: 3000,
          addedAt: new Date(1740738312952),
        },
        {
          id: "item06",
          ownerData: {
            id: "2",
            name: "Premium shawarma",
            deliveryPrice: 300,
          },
          image: "witty-sha.jpg",
          name: "turkey shawarma",
          price: 2000,
          addedAt: new Date(1740738222952),
        },
        {
          id: "item07",
          ownerData: {
            id: "2",
            name: "Premium shawarma",
            deliveryPrice: 300,
          },
          image: "witty-sha.jpg",
          name: "Double Roasted shawarma",
          price: 8000,
          addedAt: new Date(1740738822952),
        },
        {
          id: "item08",
          ownerData: {
            id: "2",
            name: "Premium shawarma",
            deliveryPrice: 300,
          },
          image: "witty-sha.jpg",
          name: "Pork shawarma",
          price: 4000,
          addedAt: new Date(1740738422952),
        },
      ],
    },
    {
      id: "3",
      name: "witty shawarma 2",
      location: "Ago Okota",
      deliveryPrice: 200,
      profile: "witty-sha.jpg",
      isOpen: true,
      recommendations: [
        {
          id: "item09",
          ownerData: {
            id: "3",
            name: "witty shawarma 2",
            deliveryPrice: 200,
          },
          image: "witty-sha.jpg",
          name: "chicken shawarma",
          price: 4000,
          addedAt: new Date(1740738422952),
        },
        {
          id: "item10",
          ownerData: {
            id: "3",
            name: "witty shawarma 2",
            deliveryPrice: 200,
          },
          image: "witty-sha.jpg",
          name: "turkey shawarma",
          price: 6000,
          addedAt: new Date(1740738622952),
        },
        {
          id: "item11",
          ownerData: {
            id: "3",
            name: "witty shawarma 2",
            deliveryPrice: 200,
          },
          image: "witty-sha.jpg",
          name: "Double Roasted shawarma",
          price: 8000,
          addedAt: new Date(1740738822952),
        },
        {
          id: "item12",
          ownerData: {
            id: "3",
            name: "witty shawarma 2",
            deliveryPrice: 200,
          },
          image: "witty-sha.jpg",
          name: "Pork shawarma",
          price: 7000,
          addedAt: new Date(1740738722952),
        },
      ],
    },
    {
      id: "4",
      name: "Premium shawarma 2",
      location: "Century, Ago",
      deliveryPrice: 150,
      profile: "witty-sha.jpg",
      isOpen: true,
      recommendations: [
        {
          id: "item13",
          ownerData: {
            id: "4",
            name: "Premium shawarma 2",
            deliveryPrice: 150,
          },
          image: "witty-sha.jpg",
          name: "chicken shawarma",
          price: 8000,
          addedAt: new Date(1740738822952),
        },
        {
          id: "item14",
          ownerData: {
            id: "4",
            name: "Premium shawarma 2",
            deliveryPrice: 150,
          },
          image: "witty-sha.jpg",
          name: "turkey shawarma",
          price: 9000,
          addedAt: new Date(1740738922952),
        },
        {
          id: "item15",
          ownerData: {
            id: "4",
            name: "Premium shawarma 2",
            deliveryPrice: 150,
          },
          image: "witty-sha.jpg",
          name: "Double Roasted shawarma",
          price: 1600,
          addedAt: new Date(1740738022952),
        },
        {
          id: "item16",
          ownerData: {
            id: "4",
            name: "Premium shawarma 2",
            deliveryPrice: 150,
          },
          image: "witty-sha.jpg",
          name: "Pork shawarma",
          price: 7000,
          addedAt: new Date(1740738722952),
        },
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
          className={`flex w-full gap-4 sw700:h-[60dvh] h-[50dvh] max-h-[63.7dvh] min-h-[400px] active:cursor-grabbing ${
            cartIsOpen ? "opacity-0" : "opacity-100"
          }`}
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={onDragEnd}
            style={{ x: dragX }}
            className={`bg-[#f2f2f2] h-full shrink-0 w-full rounded-[25px] overflow-x-hidden overflow-y-auto p-2 flex flex-col gap-4 ${
              numTotalItems && "pb-[90px]"
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
        <div
          className={`absolute w-full left-1/2 translate-x-[-50%] px-2 flex flex-col gap-1 items-center z-10 transition-all bottom-2 ${
            cartIsOpen ? "-bottom-3 invisible opacity-0" : "visible opacity-100"
          }`}
        >
          <PageControl
            numOptions={2}
            activeIndex={pageIndex}
            setActiveIndex={setPageIndex}
            className={!numTotalItems ? "shadow-sgc" : ""}
          />
          {!!numTotalItems && <CartButton setCartIsOpen={setCartIsOpen} />}
        </div>
        <div
          className={`h-full w-full absolute transition-all ${
            cartIsOpen
              ? "left-0 visible opacity-100"
              : "left-3 invisible opacity-0"
          }`}
        >
          <Cart cartIsOpen={cartIsOpen} setCartIsOpen={setCartIsOpen} />
        </div>
      </div>
      <ActivityControlsSegmentedControl />
    </div>
  );
}

export default ActivityContainer;
