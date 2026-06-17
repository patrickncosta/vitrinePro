import Link from "next/link";
import type { Product } from "@/types/product";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/button";

type FeaturedProductsProps = {
  products: Product[];
};

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section id="produtos" className="bg-paper py-20">
      <div className="container-shell">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.08em] text-muted">
              Produtos em destaque
            </p>
            <h2 className="mt-2 font-display text-4xl font-black">Escolhas prontas para pedir</h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/produtos">Ver catálogo completo</Link>
          </Button>
        </div>
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
