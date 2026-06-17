"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, MessageCircle, Search, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { selectCartQuantity, useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/cart/CartDrawer";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Produtos" },
  { href: "/produtos?categoria=roupas", label: "Categorias" },
  { href: "/como-comprar", label: "Como Comprar" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const openCart = useCartStore((state) => state.openCart);
  const quantity = mounted ? selectCartQuantity(items) : 0;

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition duration-300",
          isScrolled ? "bg-white/86 shadow-line backdrop-blur-xl" : "bg-transparent",
        )}
      >
        <div className="container-shell flex h-16 items-center justify-between gap-4">
          <Link href="/" className="font-display text-lg font-black tracking-normal">
            Luma Store
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-semibold text-muted transition hover:bg-fog hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Button asChild variant="ghost" size="icon" aria-label="Buscar produtos">
              <Link href="/produtos">
                <Search className="size-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="relative"
              aria-label={`Abrir sacola com ${quantity} itens`}
              onClick={openCart}
            >
              <ShoppingBag className="size-5" aria-hidden="true" />
              {quantity > 0 ? (
                <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-ink text-[11px] font-black text-white">
                  {quantity}
                </span>
              ) : null}
            </Button>
            <Button asChild variant="whatsapp" size="sm" className="hidden sm:inline-flex">
              <a
                href={buildWhatsAppUrl("Olá! Gostaria de conhecer os produtos da Luma Store.")}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                WhatsApp
              </a>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {menuOpen ? (
          <div className="border-t border-border bg-white/96 backdrop-blur-xl lg:hidden">
            <nav className="container-shell grid py-3" aria-label="Menu mobile">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-2 py-3 text-sm font-bold"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild variant="whatsapp" className="mt-2">
                <a
                  href={buildWhatsAppUrl("Olá! Gostaria de conhecer os produtos da Luma Store.")}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  WhatsApp
                </a>
              </Button>
            </nav>
          </div>
        ) : null}
      </header>
      <CartDrawer />
    </>
  );
}
