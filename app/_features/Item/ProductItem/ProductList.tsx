import { ItemDTO } from "@/app/_interfaces/interfaces";
import ProductItem from "./ProductItem";

function ProductList({ searchStr }: { searchStr: string }) {
  const items: ItemDTO[] = [
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
  ];
  console.log(searchStr);

  return (
    <div className="flex flex-col pl-4 py-4 text-stone-800">
      {items.map((item) => (
        <ProductItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ProductList;
