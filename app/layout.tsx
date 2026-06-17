import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/toast";

export const metadata: Metadata = {
  metadataBase: new URL("https://vitrinepro.vercel.app"),
  title: {
    default: "Luma Store | VitrinePro",
    template: "%s | Luma Store",
  },
  description:
    "Vitrine digital genérica para pequenos comércios venderem com catálogo, sacola, frete estimado e pedido via WhatsApp.",
  keywords: [
    "vitrine digital",
    "loja pelo WhatsApp",
    "catálogo online",
    "pequenos comércios",
    "Next.js",
  ],
  openGraph: {
    title: "Luma Store | VitrinePro",
    description:
      "Produtos organizados, sacola simples e pedido pronto para enviar pelo WhatsApp.",
    type: "website",
    locale: "pt_BR",
    siteName: "Luma Store",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <ToastProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
