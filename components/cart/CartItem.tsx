"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "@/types/cart";
import { formatCurrency } from "@/lib/formatCurrency";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";

type CartItemProps = {
  item: CartItemType;
};

export function CartItem({ item }: CartItemProps) {
  const increaseItem = useCartStore((state) => state.increaseItem);
  const decreaseItem = useCartStore((state) => state.decreaseItem);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <article className="grid grid-cols-[76px_1fr] gap-3 border-b border-border py-4">
      <div className="product-media overflow-hidden rounded-md">
        <img
          src={item.image}
          alt={item.name}
          className="aspect-[4/5] h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-ink">{item.name}</h3>
            <p className="mt-1 text-xs text-muted">
              {item.selectedSize ? `Tamanho: ${item.selectedSize}` : "Tamanho único"}
              {item.selectedColor ? ` · Cor: ${item.selectedColor}` : null}
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 shrink-0"
            aria-label={`Remover ${item.name}`}
            onClick={() => removeItem(item.id)}
          >
            <Trash2 className="size-4" aria-hidden="true" />
          </Button>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex h-9 items-center rounded-md border border-border bg-paper">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8"
              aria-label={`Diminuir quantidade de ${item.name}`}
              onClick={() => decreaseItem(item.id)}
            >
              <Minus className="size-4" aria-hidden="true" />
            </Button>
            <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8"
              aria-label={`Aumentar quantidade de ${item.name}`}
              onClick={() => increaseItem(item.id)}
              disabled={item.quantity >= item.stock}
            >
              <Plus className="size-4" aria-hidden="true" />
            </Button>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted">{formatCurrency(item.unitPrice)} un.</p>
            <p className="text-sm font-black">{formatCurrency(item.unitPrice * item.quantity)}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
