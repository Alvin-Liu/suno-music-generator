import { VARIANT_IDS_BY_TYPE } from "@/lib/constants";
import { insertOrder, updateOrderSession } from "@/models/order";
import type { CreateCheckoutResult } from "lemonsqueezy.ts/dist/types";
import type { Order } from "@/types/order";

import { respData, respErr } from "@/utils/response";
import { UpgradeType } from "@/types/subscribe";
import { fetchEnhanced } from '@/utils/request';
import { currentUser } from "@clerk/nextjs";
import { genOrderNo } from "@/lib/order";
import { tiers } from "@/lib/constants";

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
    return respErr("not login");
  }
  const user_email = user.emailAddresses[0].emailAddress;
  console.log("user email: ", user_email);

  try {
    const { plan } = await req.json();
    const variantId = VARIANT_IDS_BY_TYPE[plan as UpgradeType];

    const tier = tiers.find((tier) => tier.plan === plan);

    if (!tier) {
      return respErr("invalid params");
    }

    if (!variantId) {
      return respErr("invalid plan");
    }

    const order_no = genOrderNo();

    const currentDate = new Date();
    const oneMonthLater = new Date(currentDate);
    oneMonthLater.setMonth(currentDate.getMonth() + 1);

    const created_at = currentDate.toISOString();
    const expired_at = oneMonthLater.toISOString();

    const order: Order = {
      order_no: order_no,
      created_at: created_at,
      user_email: user_email,
      amount: tier.amount,
      plan: plan,
      expired_at: expired_at,
      order_status: 1,
      credits: tier.credits,
    };

    insertOrder(order);

    console.log("Create new order: ", order);

    const checkout = (await fetchEnhanced(
      `${process.env.LEMON_SQUEEZY_HOST}/checkouts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
        },
        data: {
          data: {
            type: "checkouts",
            attributes: {
              checkout_data: {
                custom: {
                  email: user_email,
                  userId: user.id,
                  username: user.firstName,
                  orderId: order_no
                },
              },
            },
            relationships: {
              store: {
                data: { type: "stores", id: process.env.LEMON_SQUEEZY_STORE_ID },
              },
              variant: { data: { type: "variants", id: '' + variantId } },
            },
          }
        },
      }
    )) as CreateCheckoutResult;

    updateOrderSession(order_no, checkout?.data?.id);

    return respData(checkout?.data?.attributes?.url);
  } catch (error: any) {
    console.error("POST request failed:", error);
    return respErr("An unexpected error occurred. Please try again later.");
  }
}
