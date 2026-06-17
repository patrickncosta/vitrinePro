import type { Metadata } from "next";
import { HowToBuySection } from "@/components/sections/HowToBuySection";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Como Comprar",
  description: "Veja como escolher produtos, montar a sacola e finalizar pelo WhatsApp.",
};

export default function HowToBuyPage() {
  return (
    <>
      <section className="border-b border-border bg-background pt-28">
        <div className="container-shell pb-12">
          <p className="text-sm font-bold uppercase tracking-[0.08em] text-muted">Como Comprar</p>
          <h1 className="mt-2 max-w-3xl font-display text-5xl font-black leading-tight">
            Escolha, monte a sacola e envie pelo WhatsApp.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            O VitrinePro troca checkout tradicional por uma conversa direta com a loja, ideal para
            pequenos comércios.
          </p>
        </div>
      </section>
      <HowToBuySection />
      <ContactSection />
    </>
  );
}
