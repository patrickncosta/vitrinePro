import type { CartItem, ShippingOption } from "@/types/cart";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/lib/formatCurrency";
import { getProductPrice } from "@/data/products";

export const STORE_WHATSAPP = "5537999999999";
export const STORE_INSTAGRAM = "@lumastore.demo";
export const STORE_ADDRESS = "Rua das Flores, 120 - Centro";
export const STORE_HOURS = "Segunda a sexta, 9h às 18h. Sábado, 9h às 13h.";

type OrderMessageInput = {
  items: CartItem[];
  subtotal: number;
  shipping?: ShippingOption;
  total: number;
};

export function buildOrderMessage({
  items,
  subtotal,
  shipping,
  total,
}: OrderMessageInput) {
  const lines = items.map((item) => {
    const details = [
      item.selectedSize ? `Tamanho: ${item.selectedSize}` : null,
      item.selectedColor ? `Cor: ${item.selectedColor}` : null,
      `Valor: ${formatCurrency(item.unitPrice * item.quantity)}`,
    ]
      .filter(Boolean)
      .join(" ");

    return `${item.quantity}x ${item.name} ${details}`;
  });

  return [
    "Olá! Gostaria de fazer um pedido:",
    "",
    ...lines,
    "",
    `Subtotal: ${formatCurrency(subtotal)}`,
    `Frete estimado: ${formatCurrency(shipping?.price ?? 0)}`,
    `Total estimado: ${formatCurrency(total)}`,
    `Forma de entrega: ${shipping?.label ?? "A combinar"}`,
    `Cidade/CEP: ${shipping?.cityOrZip || "Não informado"}`,
    "",
    "Aguardo confirmação da disponibilidade e pagamento.",
  ].join("\n");
}

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export function buildProductMessage(product: Product, size?: string, color?: string) {
  const details = [
    `Olá! Tenho interesse no produto ${product.name}.`,
    `Valor: ${formatCurrency(getProductPrice(product))}`,
    size ? `Tamanho: ${size}` : null,
    color ? `Cor: ${color}` : null,
    "Pode confirmar disponibilidade e forma de pagamento?",
  ].filter(Boolean);

  return details.join("\n");
}

export function buildProductShareMessage(product: Product) {
  return [
    `Olha esse produto da Luma Store: ${product.name}`,
    `Preço: ${formatCurrency(getProductPrice(product))}`,
    `https://vitrinepro.local/produto/${product.slug}`,
  ].join("\n");
}
