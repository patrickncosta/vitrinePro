"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, Minus, Plus, Share2, ShoppingBag } from "lucide-react";
import type { Product } from "@/types/product";
import { categories } from "@/data/categories";
import { getProductPrice } from "@/data/products";
import { formatCurrency } from "@/lib/formatCurrency";
import {
  buildProductMessage,
  buildProductShareMessage,
  buildWhatsAppUrl,
} from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/product/FavoriteButton";
import { useToast } from "@/components/ui/toast";

type ProductDetailProps = {
  product: Product;
  relatedProducts: Product[];
};

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const { showToast } = useToast();
  const category = categories.find((item) => item.id === product.category);
  const currentPrice = getProductPrice(product);
  const unavailable = product.stock <= 0;
  const directMessage = buildProductMessage(product, selectedSize, selectedColor);
  const shareMessage = buildProductShareMessage(product);

  function handleAddToCart() {
    if (unavailable) return;

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      category: category?.name ?? product.category,
      unitPrice: currentPrice,
      selectedSize,
      selectedColor,
      quantity,
      stock: product.stock,
    });
    showToast({
      title: "Produto adicionado",
      description: `${quantity}x ${product.name} entrou na sacola.`,
    });
  }

  return (
    <section className="container-shell pb-20 pt-28">
      <Link href="/produtos" className="text-sm font-bold text-muted transition hover:text-ink">
        Voltar para produtos
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-3 lg:grid-cols-[88px_1fr]">
          <div className="order-2 flex gap-3 overflow-x-auto lg:order-1 lg:grid lg:overflow-visible">
            {product.images.map((image) => (
              <button
                key={image}
                type="button"
                aria-label={`Ver imagem de ${product.name}`}
                onClick={() => setActiveImage(image)}
                className={cn(
                  "product-media size-20 shrink-0 overflow-hidden rounded-md border transition",
                  activeImage === image ? "border-ink" : "border-transparent",
                )}
              >
                <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
          <div className="product-media order-1 overflow-hidden rounded-lg lg:order-2">
            <img
              src={activeImage}
              alt={product.name}
              className="aspect-[4/5] h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="lg:pl-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted">
                {category?.name}
              </p>
              <h1 className="mt-2 font-display text-4xl font-black leading-tight md:text-5xl">
                {product.name}
              </h1>
            </div>
            <FavoriteButton productId={product.id} productName={product.name} />
          </div>

          <div className="mt-5 flex flex-wrap items-end gap-3">
            {product.salePrice ? (
              <p className="text-lg text-muted line-through">{formatCurrency(product.price)}</p>
            ) : null}
            <p className="font-display text-3xl font-black">{formatCurrency(currentPrice)}</p>
            {product.badge ? <Badge variant={product.badge === "Promoção" ? "sale" : "new"}>{product.badge}</Badge> : null}
            {unavailable ? <Badge variant="outline">Indisponível</Badge> : null}
          </div>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">{product.description}</p>

          <div className="mt-8 grid gap-6">
            <div>
              <p className="text-sm font-black">Tamanho ou variação</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "min-w-12 rounded-md border px-4 py-2 text-sm font-bold transition",
                      selectedSize === size
                        ? "border-ink bg-ink text-white"
                        : "border-border bg-paper hover:border-ink",
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-black">Cor</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "rounded-md border px-4 py-2 text-sm font-bold transition",
                      selectedColor === color
                        ? "border-ink bg-ink text-white"
                        : "border-border bg-paper hover:border-ink",
                    )}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div>
                <p className="text-sm font-black">Quantidade</p>
                <div className="mt-3 flex h-11 items-center rounded-md border border-border bg-paper">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Diminuir quantidade"
                    onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  >
                    <Minus className="size-4" aria-hidden="true" />
                  </Button>
                  <span className="w-10 text-center text-sm font-black">{quantity}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Aumentar quantidade"
                    onClick={() => setQuantity((value) => Math.min(product.stock || 1, value + 1))}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="size-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>

              <div className="pt-7 text-sm text-muted">
                Estoque fictício:{" "}
                <strong className="text-ink">
                  {product.stock > 0 ? `${product.stock} unidades` : "sem estoque"}
                </strong>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Button type="button" size="lg" onClick={handleAddToCart} disabled={unavailable}>
              <ShoppingBag className="size-4" aria-hidden="true" />
              Adicionar à sacola
            </Button>
            <Button asChild variant="whatsapp" size="lg" aria-disabled={unavailable}>
              <a href={buildWhatsAppUrl(directMessage)} target="_blank" rel="noreferrer">
                <MessageCircle className="size-4" aria-hidden="true" />
                Pedir no WhatsApp
              </a>
            </Button>
          </div>

          <Button asChild variant="ghost" className="mt-3">
            <a href={buildWhatsAppUrl(shareMessage)} target="_blank" rel="noreferrer">
              <Share2 className="size-4" aria-hidden="true" />
              Compartilhar produto
            </a>
          </Button>
        </div>
      </div>

      {relatedProducts.length > 0 ? (
        <div className="mt-20">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.08em] text-muted">
                Você também pode gostar
              </p>
              <h2 className="font-display text-2xl font-black">Produtos relacionados</h2>
            </div>
            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <Link href="/produtos">Ver catálogo</Link>
            </Button>
          </div>
          <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <article key={item.id}>
                <Link href={`/produto/${item.slug}`} className="group block">
                  <div className="product-media overflow-hidden rounded-lg">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="aspect-[4/5] h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="mt-3 font-bold">{item.name}</h3>
                  <p className="text-sm text-muted">{formatCurrency(getProductPrice(item))}</p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
