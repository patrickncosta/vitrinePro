"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CategorySlug } from "@/types/product";

export type SortOption = "recentes" | "menor-preco" | "maior-preco" | "mais-vendidos";

type FilterStore = {
  search: string;
  category: CategorySlug | "todos";
  maxPrice: number;
  sort: SortOption;
  favorites: string[];
  theme: "light" | "contrast";
  setSearch: (search: string) => void;
  setCategory: (category: CategorySlug | "todos") => void;
  setMaxPrice: (maxPrice: number) => void;
  setSort: (sort: SortOption) => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  setTheme: (theme: "light" | "contrast") => void;
  resetFilters: () => void;
};

export const useFilterStore = create<FilterStore>()(
  persist(
    (set, get) => ({
      search: "",
      category: "todos",
      maxPrice: 300,
      sort: "recentes",
      favorites: [],
      theme: "light",
      setSearch: (search) => set({ search }),
      setCategory: (category) => set({ category }),
      setMaxPrice: (maxPrice) => set({ maxPrice }),
      setSort: (sort) => set({ sort }),
      toggleFavorite: (productId) =>
        set((state) => ({
          favorites: state.favorites.includes(productId)
            ? state.favorites.filter((id) => id !== productId)
            : [...state.favorites, productId],
        })),
      isFavorite: (productId) => get().favorites.includes(productId),
      setTheme: (theme) => set({ theme }),
      resetFilters: () =>
        set({
          search: "",
          category: "todos",
          maxPrice: 300,
          sort: "recentes",
        }),
    }),
    {
      name: "vitrinepro-preferences",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        favorites: state.favorites,
        theme: state.theme,
      }),
    },
  ),
);
