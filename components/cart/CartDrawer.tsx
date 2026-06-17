"use client";

import { ShoppingBag, Trash2 } from "lucide-react";
import { buildOrderMessage } from "@/lib/whatsapp";
import { formatCurrency } from "@/lib/formatCurrency";
import {
  selectCartQuantity,
  selectCartSubtotal,
  useCartStore,
} from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CartItem } from "@/components/cart/CartItem";
import { ShippingCalculator } from "@/components/cart/ShippingCalculator";
import { WhatsAppButton } from "@/components/cart/WhatsAppButton";
import { EmptyState } from "@/components/product/EmptyState";

export function CartDrawer() {
  const isOpen = useCartStore((state) => state.isOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const openCart = useCartStore((state) => state.openCart);
  const items = useCartStore((state) => state.items);
  const shipping = useCartStore((state) => state.shipping);
  const clearCart = useCartStore((state) => state.clearCart);

  const subtotal = selectCartSubtotal(items);
  const quantity = selectCartQuantity(items);
  const total = subtotal + (shipping?.price ?? 0);
  const message = buildOrderMessage({ items, subtotal, shipping, total });

  return (
    <Sheet open={isOpen} onOpenChange={(open) => (open ? openCart() : closeCart())}>
      <SheetContent>
        <SheetHeader className="border-b border-border pr-14">
          <SheetTitle>Sacola</SheetTitle>
          <SheetDescription>
            {quantity > 0
              ? `${quantity} item${quantity > 1 ? "s" : ""} aguardando confirmação`
              : "Monte seu pedido para enviar pelo WhatsApp."}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 items-center justify-center px-5">
            <EmptyState
              icon={ShoppingBag}
              title="Sua sacola está vazia"
              description="Adicione produtos e finalize o pedido com a loja em poucos toques."
              actionHref="/produtos"
              actionLabel="Ver produtos"
            />
          </div>
        ) : (
          <>
            <div className="hide-scrollbar flex-1 overflow-y-auto px-5">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}

              <div className="py-5">
                <ShippingCalculator />
              </div>
            </div>

            <div className="border-t border-border bg-background px-5 py-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted">Subtotal</span>
                  <strong>{formatCurrency(subtotal)}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">Frete</span>
                  <strong>{formatCurrency(shipping?.price ?? 0)}</strong>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-3 text-base">
                  <span className="font-black">Total estimado</span>
                  <strong>{formatCurrency(total)}</strong>
                </div>
              </div>

              <div className="mt-4 grid gap-2">
                <WhatsAppButton message={message} className="w-full" disabled={items.length === 0}>
                  Finalizar pedido pelo WhatsApp
                </WhatsAppButton>
                <Button type="button" variant="ghost" className="w-full" onClick={clearCart}>
                  <Trash2 className="size-4" aria-hidden="true" />
                  Limpar sacola
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
