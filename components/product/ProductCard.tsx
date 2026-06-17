"use client";

import Link from "next/link";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import type { Product } from "@/types/product";
import { categories } from "@/data/categories";
import { getProductPrice } from "@/data/products";
import { formatCurrency } from "@/lib/formatCurrency";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/product/FavoriteButton";
import { useToast } from "@/components/ui/toast";

type ProductCardProps = {
  product: Product;
  compact?: boolean;
};

const badgeVariant = {
  Novo: "new",
  "Mais vendido": "default",
  Promoção: "sale",
} as const;

export function ProductCard({ product, compact }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { showToast } = useToast();
  const category = categories.find((item) => item.id === product.category);
  const currentPrice = getProductPrice(product);
  const unavailable = product.stock <= 0;

  function handleAddToCart() {
    if (unavailable) return;

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      category: category?.name ?? product.category,
      unitPrice: currentPrice,
      selectedSize: product.sizes[0],
      selectedColor: product.colors[0],
      stock: product.stock,
    });
    showToast({
      title: "Produto adicionado",
      description: `${product.name} entrou na sacola.`,
    });
  }

  return (
    <article className="group relative min-w-0">
      <div className="product-media relative overflow-hidden rounded-lg">
        <Link href={`/produto/${product.slug}`} aria-label={`Ver detalhes de ${product.name}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="aspect-[4/5] h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
            loading="eager"
          />
        </Link>
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {product.badge ? (
            <Badge variant={badgeVariant[product.badge]}>{product.badge}</Badge>
          ) : null}
          {unavailable ? <Badge variant="outline">Indisponível</Badge> : null}
        </div>
        <FavoriteButton
          productId={product.id}
          productName={product.name}
          className="absolute right-3 top-3"
        />
      </div>

      <div className="pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
              {category?.name}
            </p>
            <h3 className="mt-1 truncate font-display text-base font-black text-ink">
              {product.name}
            </h3>
          </div>
          <div className="shrink-0 text-right">
            {product.salePrice ? (
              <p className="text-xs text-muted line-through">{formatCurrency(product.price)}</p>
            ) : null}
            <p className="font-black">{formatCurrency(currentPrice)}</p>
          </div>
        </div>

        {!compact ? (
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Button asChild variant="outline">
              <Link href={`/produto/${product.slug}`}>
                Ver detalhes
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              type="button"
              size="icon"
              aria-label={`Adicionar ${product.name} à sacola`}
              onClick={handleAddToCart}
              disabled={unavailable}
            >
              <ShoppingBag className="size-4" aria-hidden="true" />
            </Button>
          </div>
        ) : null}
      </div>
    </article>
  );
}
