"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Toast = {
  id: string;
  title: string;
  description?: string;
};

type ToastContextValue = {
  showToast: (toast: Omit<Toast, "id">) => void;
};

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const showToast = React.useCallback((toast: Omit<Toast, "id">) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { ...toast, id }].slice(-3));
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 2800);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className={cn(
          "pointer-events-none fixed inset-x-4 bottom-4 z-[80] flex flex-col gap-2 sm:left-auto sm:right-5 sm:w-96",
        )}
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 rounded-lg border border-border bg-paper p-4 text-ink shadow-soft"
            role="status"
          >
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-sage" aria-hidden="true" />
            <div>
              <p className="text-sm font-bold">{toast.title}</p>
              {toast.description ? (
                <p className="mt-1 text-sm text-muted">{toast.description}</p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}
