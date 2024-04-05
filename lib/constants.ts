import { VariantIdsByType, UpgradeType } from "@/types/subscribe";

export const planType: { [key in string]: UpgradeType } = {
  monthly: 'monthly',
  oneTime: 'one-time',
}

export const VARIANT_IDS_BY_TYPE = {
  [planType.monthly]: process.env.LEMON_SQUEEZY_MEMBERSHIP_MONTHLY_VARIANT_ID || '', // checkouts 请求传参要用string，但是webhook收到的variant_id是number
  [planType.oneTime]: process.env.LEMON_SQUEEZY_MEMBERSHIP_SINGLE_TIME_VARIANT_ID || '',
} as VariantIdsByType

export const tiers = [
  {
    name: "One-time Payment",
    id: "one-time-payment",
    priceMonthly: "$1.99",
    unit: "",
    plan: planType.oneTime,
    amount: 199,
    credits: 10,
    description: "Trial Plan for Short-term Use",
    features: [
      "10 credits for music generation",
      "Valid for 1 month",
      "Standard quality music",
      "Normal generation speed"
    ],
    featured: false,
  },
  {
    name: "Subscribe",
    id: "subscribe",
    priceMonthly: "$4.99",
    unit: "/month",
    plan: planType.monthly,
    amount: 499,
    credits: 100,
    description: "Basic Monthly Subscription",
    features: [
      "Up to 100 credits",
      "Valid for 1 month",
      "High quality music",
      "Fast generation speed"
    ],
    featured: true,
  }
];