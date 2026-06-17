"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";

type WhatsAppButtonProps = {
  message: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

export function WhatsAppButton({
  message,
  children,
  disabled,
  className,
}: WhatsAppButtonProps) {
  if (disabled) {
    return (
      <Button type="button" variant="whatsapp" className={className} disabled>
        <MessageCircle className="size-4" aria-hidden="true" />
        {children}
      </Button>
    );
  }

  return (
    <Button asChild variant="whatsapp" className={className}>
      <a href={buildWhatsAppUrl(message)} target="_blank" rel="noreferrer">
        <MessageCircle className="size-4" aria-hidden="true" />
        {children}
      </a>
    </Button>
  );
}
