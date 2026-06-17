export type ShippingMethod = "delivery" | "pickup";

export type ShippingOption = {
  method: ShippingMethod;
  label: string;
  price: number;
  cityOrZip?: string;
  note: string;
};

export type CustomerInfo = {
  cityOrZip: string;
  method: ShippingMethod;
};

export type CartItem = {
  id: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  category: string;
  unitPrice: number;
  selectedSize?: string;
  selectedColor?: string;
  quantity: number;
  stock: number;
};
