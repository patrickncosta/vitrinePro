export type CategorySlug =
  | "roupas"
  | "acessorios"
  | "calcados"
  | "cosmeticos"
  | "presentes"
  | "promocoes";

export type ProductBadge = "Novo" | "Mais vendido" | "Promoção";

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: CategorySlug;
  price: number;
  salePrice?: number;
  description: string;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  badge?: ProductBadge;
  featured: boolean;
  bestSeller: boolean;
  createdAt: string;
};

export type Category = {
  id: CategorySlug;
  name: string;
  image: string;
  description: string;
  accent: "wide" | "tall" | "standard";
};
