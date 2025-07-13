export interface AddressDTO {
  id?: string;
  name: string;
  type: "Point";
  coordinates: [number, number];
  isSelected: boolean;
}

export interface ReferrerDTO {
  id?: string;
  referrer: string | UserDTO;
  prizeWithdrawn: boolean;
  prizePrice: number;
}

export interface UserDTO {
  id?: Readonly<string>;
  name: string;
  email: string;
  phoneNumber?: string;
  addresses?: AddressDTO[];
  referrer: null | (Partial<ReferrerDTO> & Pick<ReferrerDTO, "referrer">);
  refPageVisits?: number;
  createdAt: Date | number;
}

export interface ItemDTO {
  id: string;
  name: string;
  image: string;
  price: number;
  slug: string;
  businessData: ItemBusinessData | string;
  itemType: BusinessTypesDTO;
  createdAt: Date | number;
}
export type ItemBusinessData = Pick<
  BusinessDTO,
  "id" | "name" | "deliveryPrice" | "slug" | "address"
>;

export type BusinessTypesDTO = "food" | "shawarma" | "pharmacy";
export type RecommendationDTO = {
  businessType: BusinessTypesDTO;
  items: string[] | ItemDTO[];
};

export interface BusinessDTO {
  id: string;
  name: string;
  businessTypes: BusinessTypesDTO[];
  owner: string | UserDTO;
  address: BusinessAddressDTO;
  deliveryPrice: number;
  profileImg: string;
  isOpen: boolean;
  slug: string;
  recommendations: RecommendationDTO[];
  createdAt: Date | number;
}

export type BusinessAddressDTO = Omit<AddressDTO, "isSelected">;

export type CartGroupDTO = {
  id: ItemBusinessData["id"];
  name: ItemBusinessData["name"];
  deliveryPrice: ItemBusinessData["deliveryPrice"];
  items: ItemDTO[];
  totalPrice: number;
  address: ItemBusinessData["address"];
};

export type CartDTO = {
  groups: CartGroupDTO[];
  numTotalItems: number;
  deliveryTotal: number;
  priceTotal: number;
  farthestPurchase: BusinessDTO["address"] | undefined;
};

export type OrderDTO = {
  id?: string;
  user: UserDTO["id"] | UserDTO;
  items: ItemDTO["id"][] | ItemDTO[];
  businesses: BusinessDTO["id"][] | BusinessDTO[];
  farthestPurchase: BusinessDTO["id"];
  totalItemPrice: ItemDTO["price"];
  totalDeliveryPrice: BusinessDTO["deliveryPrice"];
  status: "active" | "delivered";
  deliveredAt?: Date | number;
  createdAt: Date | number;
};

export type FeedbackDTO = {
  id?: string;
  name: UserDTO["name"];
  phoneNumber: UserDTO["phoneNumber"];
  message: string;
  unseen: boolean;
  createdAt: Date | number;
};

export type NarrowOrderDTO = OrderDTO & {
  user: UserDTO;
  items: ItemDTO[];
  businesses: BusinessDTO[];
  farthestPurchase: BusinessDTO;
};

export type InputsProps = {
  type: "tel" | "select" | "text" | "email";
  theme?: string;
  label?: string;
  helperText?: string;
  selectOpt?: { value: string; text?: string; png?: string }[];
  placeHolder: string;
  className: string;
  name: string;
  required: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export type AppModalDTO = {
  isOpen: boolean;
  type: undefined | "checkout" | "scan-qr-code";
  props: {
    checkout?: {
      order?: OrderDTO;
      errorMsg?: string;
    };
    scanQRCode?: { url: string };
  };
};

export type AdminAggregatesActiveOrderDTO = OrderDTO & {
  farthestPurchase: BusinessDTO;
  user: UserDTO;
};

export type AdminAggregatesDTO = {
  activeOrders: AdminAggregatesActiveOrderDTO[];
  totalOrders: number;
  totalDeliveriesMade: number;
  totalItemsDelivered: number;
  averageDeliveredItemPrice: number;
  totalDeliveredItemPrice: number;
  totalDeliveryPrice: number;
};

export type ActivityType = "search" | "default";

export const BUSINESS_TYPES: BusinessDTO["businessTypes"] = [
  "shawarma",
  "food",
  "pharmacy",
];

export const DEFAULT_GEOJSON = "Point";

export const DEFAULT_COORDS: AddressDTO["coordinates"] = [
  3.3191478252410893, 6.510770062610523,
];
export const DEFAULT_ADDRESS: AddressDTO = {
  name: "",
  type: "Point",
  coordinates: DEFAULT_COORDS,
  isSelected: false,
};
