import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
};

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionHref,
  actionLabel,
}: EmptyStateProps) {
  return (
    <div className="mx-auto max-w-sm text-center">
      <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-fog">
        <Icon className="size-6" aria-hidden="true" />
      </div>
      <h3 className="mt-4 font-display text-xl font-black">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      {actionHref && actionLabel ? (
        <Button asChild className="mt-5">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      ) : null}
    </div>
  );
}
