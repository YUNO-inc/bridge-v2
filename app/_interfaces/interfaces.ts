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
}

export interface ItemDTO {
  id: string;
  ownerData: {
    id: BusinessDTO["id"];
    name: BusinessDTO["name"];
    deliveryPrice: BusinessDTO["deliveryPrice"];
    slug: BusinessDTO["slug"];
  };
  image: string;
  name: string;
  price: number;
  slug: string;
  addedAt: Date | number;
}

export interface BusinessDTO {
  id: string;
  name: string;
  location: string;
  deliveryPrice: number;
  profile: string;
  isOpen: boolean;
  slug: string;
  recommendations: ItemDTO[];
}

export type CartGroupDTO = {
  id: ItemDTO["ownerData"]["id"];
  name: ItemDTO["ownerData"]["name"];
  deliveryPrice: ItemDTO["ownerData"]["deliveryPrice"];
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
