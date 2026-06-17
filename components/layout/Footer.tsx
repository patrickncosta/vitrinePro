import Link from "next/link";
import { Instagram, MapPin, MessageCircle } from "lucide-react";
import {
  STORE_ADDRESS,
  STORE_HOURS,
  STORE_INSTAGRAM,
  buildWhatsAppUrl,
} from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t border-border bg-ink text-white">
      <div className="container-shell grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="font-display text-xl font-black">
            Luma Store
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/68">
            Uma vitrine digital simples, elegante e pronta para transformar interesse em conversa
            de venda pelo WhatsApp.
          </p>
          <Button asChild variant="secondary" className="mt-6">
            <a
              href={buildWhatsAppUrl("Olá! Gostaria de fazer um pedido na Luma Store.")}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Chamar no WhatsApp
            </a>
          </Button>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.08em] text-white/75">Loja</h2>
          <nav className="mt-4 grid gap-2 text-sm text-white/68">
            <Link href="/produtos" className="transition hover:text-white">
              Produtos
            </Link>
            <Link href="/como-comprar" className="transition hover:text-white">
              Como Comprar
            </Link>
            <Link href="/contato" className="transition hover:text-white">
              Contato
            </Link>
          </nav>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.08em] text-white/75">
            Atendimento
          </h2>
          <div className="mt-4 grid gap-3 text-sm text-white/68">
            <p className="flex gap-2">
              <Instagram className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {STORE_INSTAGRAM}
            </p>
            <p className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {STORE_ADDRESS}
            </p>
            <p>{STORE_HOURS}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4">
        <div className="container-shell flex flex-col gap-2 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Luma Store. Projeto VitrinePro.</p>
          <p>Produtos estáticos, pedido finalizado pelo WhatsApp.</p>
        </div>
      </div>
    </footer>
  );
}
