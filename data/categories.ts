import type { Category } from "@/types/product";

export const categories: Category[] = [
  {
    id: "roupas",
    name: "Roupas",
    image: "/assets/categories/roupas.jpg",
    description: "Peças versáteis para rotina, trabalho e finais de semana.",
    accent: "wide",
  },
  {
    id: "acessorios",
    name: "Acessórios",
    image: "/assets/categories/acessorios.jpg",
    description: "Detalhes que elevam qualquer composição.",
    accent: "standard",
  },
  {
    id: "calcados",
    name: "Calçados",
    image: "/assets/categories/calcados.jpg",
    description: "Modelos confortáveis, urbanos e fáceis de combinar.",
    accent: "tall",
  },
  {
    id: "cosmeticos",
    name: "Cosméticos",
    image: "/assets/categories/cosmeticos.jpg",
    description: "Cuidados pessoais com acabamento premium.",
    accent: "standard",
  },
  {
    id: "presentes",
    name: "Presentes",
    image: "/assets/categories/presentes.jpg",
    description: "Escolhas bonitas para surpreender sem complicar.",
    accent: "standard",
  },
  {
    id: "promocoes",
    name: "Promoções",
    image: "/assets/categories/promocoes.jpg",
    description: "Produtos selecionados com condições especiais.",
    accent: "wide",
  },
];
