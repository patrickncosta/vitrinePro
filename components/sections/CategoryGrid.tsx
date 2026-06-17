import Link from "next/link";
import type { Category, Product } from "@/types/product";
import { cn } from "@/lib/utils";

type CategoryGridProps = {
  categories: Category[];
  products: Product[];
};

export function CategoryGrid({ categories, products }: CategoryGridProps) {
  return (
    <section id="categorias" className="bg-background py-20">
      <div className="container-shell">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.08em] text-muted">Categorias</p>
            <h2 className="mt-2 font-display text-4xl font-black">Tudo organizado para vender</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            Categorias flexíveis para adaptar a vitrine a moda, presentes, beleza, acessórios e
            outros segmentos.
          </p>
        </div>

        <div className="grid auto-rows-[230px] gap-4 md:grid-cols-4">
          {categories.map((category) => {
            const count = products.filter((product) => product.category === category.id).length;

            return (
              <Link
                key={category.id}
                href={`/produtos?categoria=${category.id}`}
                className={cn(
                  "group relative overflow-hidden rounded-lg bg-ink text-white shadow-line",
                  category.accent === "wide" && "md:col-span-2",
                  category.accent === "tall" && "md:row-span-2",
                )}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover opacity-78 transition duration-500 group-hover:scale-105 group-hover:opacity-90"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/44 to-black/20" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-white/70">
                    {count} produtos
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-black">{category.name}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/72">
                    {category.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
