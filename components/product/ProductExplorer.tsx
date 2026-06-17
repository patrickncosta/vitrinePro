"use client";

import { useEffect, useMemo } from "react";
import { PackageSearch } from "lucide-react";
import { useSearchParams } from "next/navigation";
import type { Category, CategorySlug, Product } from "@/types/product";
import { getProductPrice } from "@/data/products";
import { useFilterStore } from "@/store/filterStore";
import { ProductFilters } from "@/components/product/ProductFilters";
import { ProductGrid } from "@/components/product/ProductGrid";
import { EmptyState } from "@/components/product/EmptyState";

type ProductExplorerProps = {
  products: Product[];
  categories: Category[];
};

const validCategories = new Set<CategorySlug>([
  "roupas",
  "acessorios",
  "calcados",
  "cosmeticos",
  "presentes",
  "promocoes",
]);

export function ProductExplorer({ products, categories }: ProductExplorerProps) {
  const searchParams = useSearchParams();
  const search = useFilterStore((state) => state.search);
  const category = useFilterStore((state) => state.category);
  const maxPrice = useFilterStore((state) => state.maxPrice);
  const sort = useFilterStore((state) => state.sort);
  const setCategory = useFilterStore((state) => state.setCategory);

  useEffect(() => {
    const categoryParam = searchParams.get("categoria");
    if (categoryParam && validCategories.has(categoryParam as CategorySlug)) {
      setCategory(categoryParam as CategorySlug);
    }
  }, [searchParams, setCategory]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return [...products]
      .filter((product) => {
        const productPrice = getProductPrice(product);
        const matchesSearch = normalizedSearch
          ? product.name.toLowerCase().includes(normalizedSearch)
          : true;
        const matchesCategory = category === "todos" ? true : product.category === category;
        const matchesPrice = productPrice <= maxPrice;
        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sort === "menor-preco") return getProductPrice(a) - getProductPrice(b);
        if (sort === "maior-preco") return getProductPrice(b) - getProductPrice(a);
        if (sort === "mais-vendidos") return Number(b.bestSeller) - Number(a.bestSeller);
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [category, maxPrice, products, search, sort]);

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <ProductFilters categories={categories} />
      <section aria-live="polite">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.08em] text-muted">
              {filteredProducts.length} produto{filteredProducts.length === 1 ? "" : "s"}
            </p>
            <h2 className="font-display text-2xl font-black">Catálogo completo</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            Estoque, frete e pagamento são confirmados pela loja durante a conversa.
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="rounded-lg border border-border bg-paper py-16">
            <EmptyState
              icon={PackageSearch}
              title="Nenhum produto encontrado"
              description="Ajuste busca, categoria ou faixa de preço para encontrar outra opção."
            />
          </div>
        )}
      </section>
    </div>
  );
}
