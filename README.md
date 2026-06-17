# VitrinePro

VitrinePro é uma vitrine digital estática para pequenos comércios exibirem produtos, opções, preços, frete estimado e enviarem o pedido pronto pelo WhatsApp.

O projeto usa a marca fictícia **Luma Store** para demonstrar uma experiência premium, genérica e adaptável a diferentes segmentos.

## Tecnologias

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Componentes locais no padrão shadcn/ui
- Lucide React
- Framer Motion
- React Hook Form
- Zod
- Zustand

## Como Rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Como Alterar Produtos

Edite `data/products.ts`.

Cada produto contém:

- `id`
- `name`
- `slug`
- `category`
- `price`
- `salePrice`
- `description`
- `images`
- `sizes`
- `colors`
- `stock`
- `badge`
- `featured`
- `bestSeller`
- `createdAt`

As categorias ficam em `data/categories.ts`.

As imagens locais ficam em `public/assets/products` e `public/assets/categories`.

## Como Alterar WhatsApp da Loja

Edite `lib/whatsapp.ts`.

Altere:

```ts
export const STORE_WHATSAPP = "5537999999999";
```

Use o formato internacional, sem espaços ou símbolos.

## Como Alterar Identidade Visual

As principais cores ficam em `tailwind.config.ts` e em `app/globals.css`.

A marca textual aparece no `Header`, `Footer` e nas mensagens do WhatsApp.

## Frete Simulado

A regra local está em `lib/shipping.ts`.

Regras atuais:

- Mesma cidade: R$ 8,00
- Região próxima: R$ 15,00
- Demais localidades: R$ 25,00
- Retirada na loja: R$ 0,00

## Publicar na Vercel

1. Envie o projeto para um repositório Git.
2. Importe o repositório na Vercel.
3. Mantenha o framework como Next.js.
4. Use `npm run build` como comando de build.
5. Publique.

O projeto não usa backend, login, banco de dados nem pagamento online.
