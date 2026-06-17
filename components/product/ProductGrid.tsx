import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";

type ProductGridProps = {
  products: Product[];
  compact?: boolean;
};

export function ProductGrid({ products, compact }: ProductGridProps) {
  return (
    <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} compact={compact} />
      ))}
    </div>
  );
}
