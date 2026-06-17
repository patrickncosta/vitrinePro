"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFilterStore } from "@/store/filterStore";
import { Button } from "@/components/ui/button";

type FavoriteButtonProps = {
  productId: string;
  productName: string;
  className?: string;
};

export function FavoriteButton({ productId, productName, className }: FavoriteButtonProps) {
  const [mounted, setMounted] = useState(false);
  const favorites = useFilterStore((state) => state.favorites);
  const toggleFavorite = useFilterStore((state) => state.toggleFavorite);
  const isFavorite = mounted && favorites.includes(productId);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      className={cn("rounded-full bg-white/90 backdrop-blur", className)}
      aria-label={isFavorite ? `Remover ${productName} dos favoritos` : `Favoritar ${productName}`}
      onClick={() => toggleFavorite(productId)}
    >
      <Heart
        className={cn("size-4", isFavorite ? "fill-ink text-ink" : "text-ink")}
        aria-hidden="true"
      />
    </Button>
  );
}
