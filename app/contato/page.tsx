import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a Luma Store pelo WhatsApp, Instagram ou visite o endereço fictício.",
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-border bg-background pt-28">
        <div className="container-shell pb-12">
          <p className="text-sm font-bold uppercase tracking-[0.08em] text-muted">Contato</p>
          <h1 className="mt-2 max-w-3xl font-display text-5xl font-black leading-tight">
            Atendimento direto para confirmar seu pedido.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Tire dúvidas, confirme frete e combine pagamento pelo canal principal da loja.
          </p>
        </div>
      </section>
      <ContactSection />
    </>
  );
}
