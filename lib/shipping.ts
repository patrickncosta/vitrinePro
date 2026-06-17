import type { CustomerInfo, ShippingOption } from "@/types/cart";

const SAME_CITY_TERMS = ["divinopolis", "divinópolis", "35500", "35501", "35502"];
const NEARBY_TERMS = [
  "itauna",
  "itaúna",
  "nova serrana",
  "carmo do cajuru",
  "claudio",
  "cláudio",
  "35680",
  "35510",
  "35520",
  "35660",
];

const normalize = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export function calculateShipping(info: CustomerInfo): ShippingOption {
  if (info.method === "pickup") {
    return {
      method: "pickup",
      label: "Retirada na loja",
      price: 0,
      note: "Retirada sem custo no endereço da loja.",
      cityOrZip: info.cityOrZip,
    };
  }

  const target = normalize(info.cityOrZip);
  const isSameCity = SAME_CITY_TERMS.some((term) => target.includes(normalize(term)));
  const isNearby = NEARBY_TERMS.some((term) => target.includes(normalize(term)));

  if (isSameCity) {
    return {
      method: "delivery",
      label: "Entrega - mesma cidade",
      price: 8,
      note: "Frete estimado. Valor final confirmado pelo WhatsApp.",
      cityOrZip: info.cityOrZip,
    };
  }

  if (isNearby) {
    return {
      method: "delivery",
      label: "Entrega - região próxima",
      price: 15,
      note: "Frete estimado. Valor final confirmado pelo WhatsApp.",
      cityOrZip: info.cityOrZip,
    };
  }

  return {
    method: "delivery",
    label: "Entrega - demais localidades",
    price: 25,
    note: "Frete estimado. Valor final confirmado pelo WhatsApp.",
    cityOrZip: info.cityOrZip,
  };
}
