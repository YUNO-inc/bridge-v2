import { BusinessDTO, ItemDTO } from "@/app/_interfaces/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  searchStr: string;
  businesses: BusinessDTO[];
  productResults: ItemDTO[];
};

const initialState: InitialState = {
  searchStr: "",
  businesses: [
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
          addedAt: 1740738322952,
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
          addedAt: 1740738522952,
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
          addedAt: 1740738922152,
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
          addedAt: 1740738422952,
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
          addedAt: 1740738312952,
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
          addedAt: 1740738222952,
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
          addedAt: 1740738822952,
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
          addedAt: 1740738422952,
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
          addedAt: 1740738422952,
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
          addedAt: 1740738622952,
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
          addedAt: 1740738822952,
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
          addedAt: 1740738722952,
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
          addedAt: 1740738822952,
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
          addedAt: 1740738922952,
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
          addedAt: 1740738022952,
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
          addedAt: 1740738722952,
        },
      ],
    },
  ],
  productResults: [
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
      addedAt: 1740738322952,
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
      addedAt: 1740738522952,
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
      addedAt: 1740738922152,
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
      addedAt: 1740738422952,
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
      addedAt: 1740738312952,
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
      addedAt: 1740738222952,
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
      addedAt: 1740738822952,
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
      addedAt: 1740738422952,
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
      addedAt: 1740738422952,
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
      addedAt: 1740738622952,
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
      addedAt: 1740738822952,
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
      addedAt: 1740738722952,
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
      addedAt: 1740738822952,
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
      addedAt: 1740738922952,
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
      addedAt: 1740738022952,
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
      addedAt: 1740738722952,
    },
  ],
};

const ActivitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    setSearchStr(state, action: PayloadAction<string>) {
      state.searchStr = action.payload;
    },
  },
});

export const { setSearchStr } = ActivitySlice.actions;

export const getActivity = (state: { activity: InitialState }) =>
  state.activity;

const ActivitySliceReducer = ActivitySlice.reducer;
export default ActivitySliceReducer;
