"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CartItem, ShippingOption } from "@/types/cart";

type AddItemInput = Omit<CartItem, "id" | "quantity"> & {
  quantity?: number;
};

type CartStore = {
  items: CartItem[];
  isOpen: boolean;
  shipping?: ShippingOption;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: AddItemInput) => void;
  removeItem: (id: string) => void;
  increaseItem: (id: string) => void;
  decreaseItem: (id: string) => void;
  clearCart: () => void;
  setShipping: (shipping?: ShippingOption) => void;
};

const makeItemId = (item: AddItemInput) =>
  [item.productId, item.selectedSize ?? "sem-tamanho", item.selectedColor ?? "sem-cor"].join(
    "::",
  );

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      shipping: undefined,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addItem: (item) => {
        const id = makeItemId(item);
        const quantity = item.quantity ?? 1;
        const existing = get().items.find((cartItem) => cartItem.id === id);

        if (existing) {
          set((state) => ({
            isOpen: true,
            items: state.items.map((cartItem) =>
              cartItem.id === id
                ? {
                    ...cartItem,
                    quantity: Math.min(cartItem.quantity + quantity, cartItem.stock),
                  }
                : cartItem,
            ),
          }));
          return;
        }

        set((state) => ({
          isOpen: true,
          items: [
            ...state.items,
            {
              ...item,
              id,
              quantity: Math.min(quantity, item.stock),
            },
          ],
        }));
      },
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      increaseItem: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
              : item,
          ),
        })),
      decreaseItem: (id) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item,
            )
            .filter((item) => item.quantity > 0),
        })),
      clearCart: () => set({ items: [], shipping: undefined }),
      setShipping: (shipping) => set({ shipping }),
    }),
    {
      name: "vitrinepro-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        shipping: state.shipping,
      }),
    },
  ),
);

export const selectCartSubtotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

export const selectCartQuantity = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.quantity, 0);
