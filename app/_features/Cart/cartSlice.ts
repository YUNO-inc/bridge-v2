import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  AddressDTO,
  BusinessDTO,
  CartDTO,
  CartGroupDTO,
  DEFAULT_COORDS,
  ItemBusinessData,
  ItemDTO,
  OrderDTO,
} from "@/app/_interfaces/interfaces";
import {
  calcDeliveryPrice,
  calcDynamicDeliveryPrice,
  isNewFarthestPoint,
  sortByFarthestPoint,
  updateLocalStorage_CLIENT,
} from "@/app/_utils/helpers";
import { RootState } from "@/app/_store/store";

type InitialState = CartDTO & { cartIsOpen: boolean; isCheckingOut: boolean };

const initialState: InitialState = {
  groups: [],
  deliveryTotal: 0,
  priceTotal: 0,
  numTotalItems: 0,
  farthestPurchase: undefined,
  cartIsOpen: false,
  isCheckingOut: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<{
        item: ItemDTO;
        deliveryAddress: AddressDTO | undefined;
      }>
    ) {
      const deliveryAddress = action.payload.deliveryAddress;
      const newItem = { ...action.payload.item, createdAt: Date.now() };

      if (typeof newItem.businessData === "string")
        throw new Error("Unable to add to cart.");

      const numOfGroups = state.groups.length > 0;
      const isFarthestPurchase = isNewFarthestPoint({
        deliveryPoint: deliveryAddress?.coordinates,
        oldPoint: state.farthestPurchase?.coordinates,
        newPoint: newItem.businessData.address.coordinates,
      });
      let groupAlreadyExits = false;

      if (!numOfGroups) state.groups.push(createGroup(newItem));
      else if (numOfGroups) {
        groupAlreadyExits = state.groups.some((group, i) => {
          if (typeof newItem.businessData === "string")
            throw new Error("Unable to add to cart.");
          const groupFound = group.id === newItem.businessData.id;
          if (groupFound) {
            state.groups[i].items.push(newItem);
            state.groups[i].totalPrice += newItem.price;
          }
          return groupFound;
        });
        if (!groupAlreadyExits) state.groups.push(createGroup(newItem));
      }

      const totalDeliveryPrice = addToTotalDeliveryPrice(
        current(state.groups),
        newItem.businessData,
        isFarthestPurchase,
        deliveryAddress,
        state.farthestPurchase
      );

      state.numTotalItems += 1;
      state.priceTotal += newItem.price;
      state.deliveryTotal = totalDeliveryPrice;
      state.farthestPurchase = isFarthestPurchase
        ? newItem.businessData.address
        : state.farthestPurchase;
      updateLocalStorage_CLIENT("local-cart", JSON.stringify(current(state)));
    },
    deleteFromCart(
      state,
      action: PayloadAction<{
        delId: ItemDTO["id"];
        delAddedAt: ItemDTO["createdAt"];
        delPrice: ItemDTO["price"];
        ownerId: ItemBusinessData["id"];
        deliveryAddress: AddressDTO;
      }>
    ) {
      const { delId, delAddedAt, delPrice, ownerId, deliveryAddress } =
        action.payload;
      const group = state.groups.find((group) => group.id === ownerId);
      if (!group) return;
      group.items = group.items.filter((item) => {
        const isDelItem = item.id === delId && item.createdAt === delAddedAt;
        if (isDelItem) group.totalPrice -= delPrice;
        return !isDelItem;
      });
      if (group.items.length < 1) {
        const sortedPickups = sortByFarthestPoint(
          deliveryAddress,
          current(state.groups).map((group) => group.address)
        );

        state.groups = state.groups.filter((group) => group.id !== ownerId);

        if (state.groups.length > 0) {
          const isFarthestPurchase = sortedPickups[0].id === group.address.id;
          state.farthestPurchase = isFarthestPurchase
            ? sortedPickups[1]
            : state.farthestPurchase;
          state.deliveryTotal = getTotalDeliveryPrice(
            state.groups,
            isFarthestPurchase
              ? sortedPickups[1]
              : current(state.farthestPurchase),
            deliveryAddress
          );
        } else {
          state.farthestPurchase = undefined;
          state.deliveryTotal = 0;
        }
      }

      state.numTotalItems -= 1;
      state.priceTotal -= delPrice;
      updateLocalStorage_CLIENT("local-cart", JSON.stringify(current(state)));
    },
    updateTotalDeliveryPrice(
      state,
      action: PayloadAction<{ deliveryAddress: AddressDTO }>
    ) {
      if (state.groups.length <= 0 || !state.farthestPurchase) return;

      state.deliveryTotal = getTotalDeliveryPrice(
        current(state.groups),
        current(state.farthestPurchase),
        action.payload.deliveryAddress
      );
      updateLocalStorage_CLIENT("local-cart", JSON.stringify(current(state)));
    },
    toogleCartIsOpen(
      state,
      action: PayloadAction<{ open: InitialState["cartIsOpen"] }>
    ) {
      state.cartIsOpen = action.payload.open;
    },
    setLocalCart(state) {
      const localCart: Partial<InitialState> = JSON.parse(
        localStorage.getItem("local-cart") || "{}"
      );
      state.groups = Array.isArray(localCart?.groups)
        ? localCart.groups
        : state.groups;
      state.deliveryTotal =
        typeof localCart?.deliveryTotal === "number"
          ? localCart.deliveryTotal
          : state.deliveryTotal;
      state.priceTotal =
        typeof localCart?.priceTotal === "number"
          ? localCart.priceTotal
          : state.priceTotal;
      state.numTotalItems =
        typeof localCart?.numTotalItems === "number"
          ? localCart.numTotalItems
          : state.numTotalItems;
      state.farthestPurchase =
        typeof localCart?.farthestPurchase === "object"
          ? localCart.farthestPurchase
          : state.farthestPurchase;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkout.pending, (state) => {
        state.isCheckingOut = true;
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.groups = initialState.groups;
        state.cartIsOpen = initialState.cartIsOpen;
        state.deliveryTotal = initialState.deliveryTotal;
        state.farthestPurchase = initialState.farthestPurchase;
        state.isCheckingOut = initialState.isCheckingOut;
        state.numTotalItems = initialState.numTotalItems;
        state.priceTotal = initialState.priceTotal;

        updateLocalStorage_CLIENT("local-cart", JSON.stringify(initialState));
        console.log(action.payload);
      })
      .addCase(checkout.rejected, (state, action) => {
        state.isCheckingOut = false;
        alert(action.payload);
      });
  },
});

export const {
  addToCart,
  deleteFromCart,
  updateTotalDeliveryPrice,
  toogleCartIsOpen,
  setLocalCart,
} = cartSlice.actions;

export const getCart = (state: { cart: InitialState }) => state.cart;

export const checkout = createAsyncThunk<
  Partial<OrderDTO>,
  undefined,
  { state: RootState }
>(
  "cart/checkout",
  async (_, { getState }) => {
    try {
      const cart = getState().cart;

      const { items, businesses } = cart.groups.reduce<
        Pick<OrderDTO, "items" | "businesses">
      >(
        (acc, group) => {
          group.items.forEach((i) => acc.items.push(i.id));
          acc.businesses.push(group.id);
          return acc;
        },
        { items: [], businesses: [] }
      );

      const order = { items, businesses };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/`,
        {
          method: "POST",
          body: JSON.stringify({ order }),
          headers: { "Content-Type": "application/json" },
        }
      );

      return await res.json();
    } catch (error) {
      const err = error as Error;
      console.error(err);
    }
  },
  {
    condition: (_, { getState }) => {
      const cart = getState().cart;
      return !cart.isCheckingOut;
    },
  }
);

export const businessIsInCart =
  (businessId: BusinessDTO["id"]) => (state: { cart: CartDTO }) =>
    state.cart.groups.some((group) => group.id === businessId);

const cartSliceReducer = cartSlice.reducer;
export default cartSliceReducer;

function createGroup(newItem: ItemDTO): CartGroupDTO {
  if (typeof newItem.businessData === "string")
    throw new Error("Unable to create a new Cart group.");

  return {
    id: newItem.businessData.id,
    name: newItem.businessData.name,
    deliveryPrice: newItem.businessData.deliveryPrice,
    items: [newItem],
    address: newItem.businessData.address,
    totalPrice: newItem.price,
  };
}

function addToTotalDeliveryPrice(
  groups: InitialState["groups"],
  businessData: ItemDTO["businessData"],
  isFarthestPurchase: boolean,
  deliveryAddress: AddressDTO | undefined,
  stateFarthestPurchase: InitialState["farthestPurchase"]
) {
  if (typeof businessData === "string")
    throw new Error("Unable to add to cart.");
  const farthestPurchase =
    isFarthestPurchase && typeof businessData !== "string"
      ? businessData.address
      : current(stateFarthestPurchase);

  const totalDP = getTotalDeliveryPrice(
    groups,
    farthestPurchase,
    deliveryAddress
  );
  return totalDP;
}

function getTotalDeliveryPrice(
  groups: InitialState["groups"],
  farthestPurchase: InitialState["farthestPurchase"],
  deliveryAddress: AddressDTO | undefined
) {
  return groups.reduce((acc, group) => {
    const deliveryPoint = deliveryAddress?.coordinates || DEFAULT_COORDS;
    const currItemPickup = group.address.coordinates;
    const dp = calcDynamicDeliveryPrice({
      farthestPickup: farthestPurchase?.coordinates,
      deliveryPoint,
      currItemPickup,
      deliveryPrice: calcDeliveryPrice(deliveryPoint, currItemPickup),
      isInCart: false,
    });
    return acc + dp;
  }, 0);
}
