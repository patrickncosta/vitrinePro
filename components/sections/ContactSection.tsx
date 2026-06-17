import { Clock, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import {
  STORE_ADDRESS,
  STORE_HOURS,
  STORE_INSTAGRAM,
  buildWhatsAppUrl,
} from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";

const contactItems = [
  { icon: Phone, label: "WhatsApp", value: "(37) 99999-9999" },
  { icon: Instagram, label: "Instagram", value: STORE_INSTAGRAM },
  { icon: MapPin, label: "Endereço", value: STORE_ADDRESS },
  { icon: Clock, label: "Horário", value: STORE_HOURS },
];

export function ContactSection() {
  return (
    <section className="bg-paper py-20">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.08em] text-muted">Contato</p>
          <h2 className="mt-2 font-display text-4xl font-black">Atendimento direto, sem fricção</h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
            A loja confirma disponibilidade, frete final e pagamento na conversa, com o pedido já
            organizado automaticamente.
          </p>
          <Button asChild variant="whatsapp" className="mt-8">
            <a
              href={buildWhatsAppUrl("Olá! Gostaria de falar com a Luma Store.")}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Chamar no WhatsApp
            </a>
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {contactItems.map((item) => (
            <article key={item.label} className="rounded-lg border border-border bg-background p-5 shadow-line">
              <div className="flex size-11 items-center justify-center rounded-md bg-fog">
                <item.icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-sm font-black uppercase tracking-[0.08em] text-muted">
                {item.label}
              </h3>
              <p className="mt-2 text-base font-bold leading-relaxed">{item.value}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
