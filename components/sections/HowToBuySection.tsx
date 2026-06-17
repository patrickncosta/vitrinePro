import Link from "next/link";
import { MessageCircle, PackageCheck, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "Escolha seus produtos",
    description: "Veja fotos, preço, descrição e disponibilidade fictícia em poucos segundos.",
    icon: PackageCheck,
  },
  {
    title: "Monte sua sacola",
    description: "Selecione tamanho, cor ou variação e confira subtotal, frete e total estimado.",
    icon: ShoppingBag,
  },
  {
    title: "Finalize pelo WhatsApp",
    description: "Envie o pedido formatado e combine disponibilidade, pagamento e entrega.",
    icon: MessageCircle,
  },
];

export function HowToBuySection() {
  return (
    <section className="bg-background py-20">
      <div className="container-shell">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.08em] text-muted">Como comprar</p>
          <h2 className="mt-2 font-display text-4xl font-black">Um caminho curto até a venda</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-lg border border-border bg-paper p-6 shadow-line">
              <div className="flex size-12 items-center justify-center rounded-md bg-fog">
                <step.icon className="size-6" aria-hidden="true" />
              </div>
              <p className="mt-6 text-sm font-black text-muted">0{index + 1}</p>
              <h3 className="mt-2 font-display text-2xl font-black">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.description}</p>
            </article>
          ))}
        </div>

        <Button asChild className="mt-8">
          <Link href="/produtos">Começar pedido</Link>
        </Button>
      </div>
    </section>
  );
}
