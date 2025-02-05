export interface BusinessI {
  name: string;
  location: string;
  deliveryPrice: number;
  profile: string;
  isOpen: boolean;
  recommendations: { image: string; name: string; price: number }[];
}
