"use client";

import { RotateCcw, Search } from "lucide-react";
import type { Category } from "@/types/product";
import { useFilterStore, type SortOption } from "@/store/filterStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ProductFiltersProps = {
  categories: Category[];
};

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "recentes", label: "Mais recentes" },
  { value: "menor-preco", label: "Menor preço" },
  { value: "maior-preco", label: "Maior preço" },
  { value: "mais-vendidos", label: "Mais vendidos" },
];

export function ProductFilters({ categories }: ProductFiltersProps) {
  const search = useFilterStore((state) => state.search);
  const category = useFilterStore((state) => state.category);
  const maxPrice = useFilterStore((state) => state.maxPrice);
  const sort = useFilterStore((state) => state.sort);
  const setSearch = useFilterStore((state) => state.setSearch);
  const setCategory = useFilterStore((state) => state.setCategory);
  const setMaxPrice = useFilterStore((state) => state.setMaxPrice);
  const setSort = useFilterStore((state) => state.setSort);
  const resetFilters = useFilterStore((state) => state.resetFilters);

  return (
    <aside className="grid gap-5 rounded-lg border border-border bg-paper p-4 shadow-line lg:sticky lg:top-24">
      <div className="space-y-2">
        <Label htmlFor="product-search">Buscar</Label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <Input
            id="product-search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Nome do produto"
            className="pl-9"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="product-category">Categoria</Label>
        <select
          id="product-category"
          value={category}
          onChange={(event) => setCategory(event.target.value as typeof category)}
          className="h-11 w-full rounded-md border border-border bg-paper px-3 text-sm font-semibold shadow-line focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          <option value="todos">Todas</option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="max-price">Preço até</Label>
          <span className="text-sm font-black">R$ {maxPrice}</span>
        </div>
        <input
          id="max-price"
          type="range"
          min="30"
          max="300"
          step="10"
          value={maxPrice}
          onChange={(event) => setMaxPrice(Number(event.target.value))}
          className="w-full accent-ink"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="product-sort">Ordenar</Label>
        <select
          id="product-sort"
          value={sort}
          onChange={(event) => setSort(event.target.value as SortOption)}
          className="h-11 w-full rounded-md border border-border bg-paper px-3 text-sm font-semibold shadow-line focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          {sortOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <Button type="button" variant="ghost" onClick={resetFilters}>
        <RotateCcw className="size-4" aria-hidden="true" />
        Limpar filtros
      </Button>
    </aside>
  );
}
