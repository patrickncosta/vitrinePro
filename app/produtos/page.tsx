import { Suspense } from "react";
import type { Metadata } from "next";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { ProductExplorer } from "@/components/product/ProductExplorer";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Catálogo completo da Luma Store com busca, filtros, ordenação e pedido via WhatsApp.",
};

export default function ProductsPage() {
  return (
    <section className="bg-background pb-20 pt-28">
      <div className="container-shell">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.08em] text-muted">
            Catálogo Luma Store
          </p>
          <h1 className="mt-2 font-display text-5xl font-black leading-tight">Produtos</h1>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Busque por nome, filtre por categoria, ajuste faixa de preço e envie sua sacola pronta
            pelo WhatsApp.
          </p>
        </div>

        <Suspense fallback={<p className="text-sm text-muted">Carregando catálogo...</p>}>
          <ProductExplorer products={products} categories={categories} />
        </Suspense>
      </div>
    </section>
  );
}
