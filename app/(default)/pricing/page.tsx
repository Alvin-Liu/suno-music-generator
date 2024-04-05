"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { fetchEnhanced } from '@/utils/request';
import { tiers } from "@/lib/constants";
import { cs } from "@/utils";
import { useRouter } from "next/navigation";

export default function () {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onCheckout = async (plan: string) => {
    try {
      setLoading(true);
      const resp = await fetchEnhanced("/api/payment/checkout", {
        method: "POST",
        data: { plan }
      });

      const { code, message, data } = resp;

      if (code === 401) {
        router.push("/sign-in");
        return
      }

      if (!data) {
        toast.error(message);
        setLoading(false);
        return;
      }

      window.location.href = data;
      setLoading(false);
    } catch (e) {
      console.log("checkout failed: ", e);
      toast.error("checkout failed");
    }
  };

  return (
    <div className="relative isolate bg-white px-6 py-8">
      <div className="mx-auto max-w-3xl text-center lg:max-w-4xl">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Suno Music Generator Pricing
        </h1>
      </div>
      <h2 className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
        Choose a plan to buy credits.
      </h2>
      <div className="flex justify-around gap-6 md:gap-8 mx-auto mt-16 grid grid-cols-1 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={cs(
              tier.featured
                ? "relative bg-white"
                : "bg-white/20 lg:mx-0",
              "flex flex-col justify-between shadow-2xl rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10"
            )}
          >
            <div>
              <p
                id={tier.id}
                className="text-base font-semibold leading-7 text-indigo-600"
              >
                {tier.name}
              </p>
              <p className="mt-4 flex items-baseline gap-x-2">
                <span className="text-5xl font-bold tracking-tight text-gray-900">
                  {tier.priceMonthly}
                </span>
                <span className="text-base text-gray-500">{tier.unit}</span>
              </p>
              <p className="mt-6 text-base leading-7 text-gray-600">
                {tier.description}
              </p>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm leading-6 text-gray-600 sm:mt-10"
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <Button
              className={cs(
                tier.featured
                  ? "transition-colors text-primary-foreground bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600"
                  : "bg-black hover:bg-gray-800",
                "mt-8 w-full rounded-md text-sm font-medium"
              )}
              disabled={loading}
              onClick={() => onCheckout(tier.plan)}
            >
              {loading ? "Processing..." : "Buy plan"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
