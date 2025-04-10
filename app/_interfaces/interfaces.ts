export interface AddressDTO {
  id?: string;
  name: string;
  coords: [number, number];
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
  "id" | "name" | "deliveryPrice" | "slug"
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
};

export type CartDTO = {
  groups: CartGroupDTO[];
  numTotalItems: number;
  deliveryTotal: number;
  priceTotal: number;
  farthestPurchase: BusinessDTO["id"] | undefined;
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

export const BUSINESS_TYPES: BusinessDTO["businessTypes"] = [
  "food",
  "shawarma",
  "pharmacy",
];
export const DEFAULT_COORDS: AddressDTO["coords"] = [
  6.510770062610523, 3.3191478252410893,
];
