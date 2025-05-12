export interface AddressDTO {
  id?: string;
  name: string;
  type: "Point";
  coordinates: [number, number];
  isSelected: boolean;
}

export interface UserDTO {
  id?: Readonly<string>;
  name: string;
  email: string;
  phoneNumber?: string;
  addresses?: AddressDTO[];
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
  user: UserDTO["id"];
  items: ItemDTO["id"][];
  businesses: BusinessDTO["id"][];
  farthestBusiness: BusinessDTO;
  createdAt: Date | number;
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
