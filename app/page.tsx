import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { ContactSection } from "@/components/sections/ContactSection";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowToBuySection } from "@/components/sections/HowToBuySection";

export default function HomePage() {
  const featuredProducts = products.filter((product) => product.featured).slice(0, 8);

  return (
    <>
      <HeroSection products={featuredProducts} />
      <CategoryGrid categories={categories} products={products} />
      <FeaturedProducts products={featuredProducts} />
      <HowToBuySection />
      <ContactSection />
    </>
  );
}
