export interface UserDTO {
  id?: Readonly<string>;
  name: string;
  email: string;
  phoneNumber?: string;
}

export type UserType = UserDTO | undefined;

export interface BusinessDTO {
  name: string;
  location: string;
  deliveryPrice: number;
  profile: string;
  isOpen: boolean;
  recommendations: { image: string; name: string; price: number }[];
}

export type CartDTO = BusinessDTO[];
