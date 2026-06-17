import Link from "next/link";
import { SearchX } from "lucide-react";
import { EmptyState } from "@/components/product/EmptyState";

export default function NotFound() {
  return (
    <section className="container-shell flex min-h-[70vh] items-center justify-center pt-24">
      <EmptyState
        icon={SearchX}
        title="Página não encontrada"
        description="O conteúdo solicitado não está disponível nesta vitrine."
        actionHref="/produtos"
        actionLabel="Ver produtos"
      />
      <Link href="/" className="sr-only">
        Voltar ao início
      </Link>
    </section>
  );
}
