"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, ShoppingBag } from "lucide-react";
import type { Product } from "@/types/product";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { formatCurrency } from "@/lib/formatCurrency";
import { getProductPrice } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type HeroSectionProps = {
  products: Product[];
};

export function HeroSection({ products }: HeroSectionProps) {
  const showcase = products.slice(0, 4);

  return (
    <section className="relative overflow-hidden border-b border-border bg-background pt-24">
      <div className="container-shell grid min-h-[calc(100svh-80px)] gap-10 pb-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          initial={{ y: 18 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <Badge variant="outline">Vitrine digital sem checkout complicado</Badge>
          <h1 className="mt-6 font-display text-5xl font-black leading-[0.96] md:text-7xl">
            Sua vitrine digital, simples, elegante e pronta para vender.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Produtos organizados, pedido pelo WhatsApp e uma experiência fácil para seus
            clientes.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/produtos">
                <ShoppingBag className="size-4" aria-hidden="true" />
                Ver produtos
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a
                href={buildWhatsAppUrl("Olá! Gostaria de fazer um pedido na Luma Store.")}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Fazer pedido pelo WhatsApp
              </a>
            </Button>
          </div>
        </motion.div>

        <div className="relative min-h-[560px] lg:min-h-[680px]" aria-label="Produtos em destaque">
          <div className="absolute inset-0 rounded-[32px] border border-border bg-white/45" />
          {showcase.map((product, index) => {
            const positions = [
              "left-0 top-8 w-[58%] rotate-[-4deg]",
              "right-0 top-0 w-[46%] rotate-[5deg]",
              "bottom-10 left-[8%] w-[42%] rotate-[3deg]",
              "bottom-0 right-[4%] w-[52%] rotate-[-3deg]",
            ];

            return (
              <motion.article
                key={product.id}
                initial={{ y: 24 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.12 * index, duration: 0.5, ease: "easeOut" }}
                className={`absolute overflow-hidden rounded-lg border border-border bg-paper shadow-soft ${positions[index]}`}
              >
                <Link href={`/produto/${product.slug}`} className="block">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="aspect-[4/5] w-full object-cover"
                    loading="eager"
                  />
                  <div className="p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
                      Luma Store
                    </p>
                    <h2 className="mt-1 truncate font-display text-lg font-black">
                      {product.name}
                    </h2>
                    <p className="mt-2 text-sm font-black">{formatCurrency(getProductPrice(product))}</p>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
