"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Truck } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { calculateShipping } from "@/lib/shipping";
import { formatCurrency } from "@/lib/formatCurrency";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const shippingSchema = z
  .object({
    method: z.enum(["delivery", "pickup"]),
    cityOrZip: z.string().trim().optional(),
  })
  .superRefine((value, ctx) => {
    if (value.method === "delivery" && !value.cityOrZip) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["cityOrZip"],
        message: "Informe uma cidade ou CEP.",
      });
    }
  });

type ShippingForm = z.infer<typeof shippingSchema>;

export function ShippingCalculator() {
  const shipping = useCartStore((state) => state.shipping);
  const setShipping = useCartStore((state) => state.setShipping);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ShippingForm>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      method: shipping?.method ?? "delivery",
      cityOrZip: shipping?.cityOrZip ?? "",
    },
  });

  const selectedMethod = watch("method");

  function onSubmit(values: ShippingForm) {
    setShipping(
      calculateShipping({
        method: values.method,
        cityOrZip: values.cityOrZip ?? "",
      }),
    );
  }

  return (
    <form className="rounded-lg border border-border bg-paper p-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-start gap-3">
        <div className="rounded-md bg-fog p-2">
          <Truck className="size-5" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-sm font-black">Frete simples</h3>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Frete estimado. Valor final confirmado pelo WhatsApp.
          </p>
        </div>
      </div>

      <fieldset className="mt-4 grid grid-cols-2 gap-2">
        <legend className="sr-only">Forma de entrega</legend>
        <label className="flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-semibold has-[:checked]:border-ink has-[:checked]:bg-fog">
          <input
            type="radio"
            value="delivery"
            className="accent-ink"
            {...register("method")}
          />
          Entrega
        </label>
        <label className="flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-semibold has-[:checked]:border-ink has-[:checked]:bg-fog">
          <input type="radio" value="pickup" className="accent-ink" {...register("method")} />
          Retirada
        </label>
      </fieldset>

      {selectedMethod === "delivery" ? (
        <div className="mt-4 space-y-2">
          <Label htmlFor="cityOrZip">Cidade ou CEP</Label>
          <Input id="cityOrZip" placeholder="Ex.: Divinópolis ou 35500-000" {...register("cityOrZip")} />
          {errors.cityOrZip ? (
            <p className="text-xs font-semibold text-[#8F3F2B]">{errors.cityOrZip.message}</p>
          ) : null}
        </div>
      ) : null}

      <div className="mt-4 flex items-center justify-between gap-3">
        <Button type="submit" variant="outline" size="sm">
          Calcular
        </Button>
        {shipping ? (
          <div className="text-right">
            <p className="text-xs text-muted">{shipping.label}</p>
            <p className="text-sm font-black">{formatCurrency(shipping.price)}</p>
          </div>
        ) : null}
      </div>
    </form>
  );
}
