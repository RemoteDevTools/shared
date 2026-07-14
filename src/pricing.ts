export type PlanId = "individual" | "company" | "custom";

export type Plan = {
  id: PlanId;
  name: string;
  description: string;
  priceCents: number;
  seatsIncluded: number;
  pricePerSeatCents: number;
  interval: "month" | "year";
  yearlyPriceCents: number;
  yearlyDiscountPercent: number;
  features: string[];
  trialDays: number;
};

export const TRIAL_DAYS = 7;

export const PAYMENT_NETWORKS = {
  celo: {
    name: "Celo",
    currency: "USDT",
    chainId: 42220,
  },
  base: {
    name: "Base",
    currency: "USDC",
    chainId: 8453,
  },
} as const;

export type PaymentNetwork = keyof typeof PAYMENT_NETWORKS;

export const WALLET_ADDRESS = "0xcC67A55fb90d788779a4b58b50786ed488BaC34b";

export const PLANS: Record<PlanId, Plan> = {
  individual: {
    id: "individual",
    name: "Individual",
    description: "For solo developers — one IDE, unlimited sessions",
    priceCents: 2000,
    seatsIncluded: 1,
    pricePerSeatCents: 0,
    interval: "month",
    yearlyPriceCents: 19200,
    yearlyDiscountPercent: 20,
    trialDays: TRIAL_DAYS,
    features: [
      "1 IDE connection",
      "Unlimited remote sessions",
      "Usage dashboard & analytics",
      "Full file, terminal & git access",
      "Web + mobile client access",
    ],
  },
  company: {
    id: "company",
    name: "Company",
    description: "For teams — base plan includes admin tools + per-seat pricing",
    priceCents: 10000,
    seatsIncluded: 1,
    pricePerSeatCents: 2000,
    interval: "month",
    yearlyPriceCents: 96000,
    yearlyDiscountPercent: 20,
    trialDays: TRIAL_DAYS,
    features: [
      "Everything in Individual",
      "Org management with Clerk",
      "Role-based access control",
      "Priority support",
      "Usage analytics for all members",
    ],
  },
  custom: {
    id: "custom",
    name: "Custom",
    description: "Dedicated support, custom integrations, flexible terms",
    priceCents: 25000,
    seatsIncluded: 1,
    pricePerSeatCents: 0,
    interval: "month",
    yearlyPriceCents: 0,
    yearlyDiscountPercent: 0,
    trialDays: 0,
    features: [
      "Everything in Company",
      "Direct support channel",
      "Custom integrations",
      "Flexible billing terms",
      "Early access to new features",
    ],
  },
};

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
}

export function planPriceForInterval(
  plan: Plan,
  interval: "month" | "year",
): number {
  if (interval === "year" && plan.yearlyPriceCents > 0) {
    return plan.yearlyPriceCents;
  }
  return plan.priceCents;
}

export function totalCompanyPrice(
  seats: number,
  interval: "month" | "year",
): number {
  const plan = PLANS.company;
  const base = planPriceForInterval(plan, interval);
  const extraSeats = Math.max(0, seats - plan.seatsIncluded);
  const seatCost = extraSeats * plan.pricePerSeatCents;
  if (interval === "year" && plan.yearlyPriceCents > 0) {
    return base + extraSeats * plan.pricePerSeatCents * 12 * 0.8;
  }
  return base + seatCost;
}

export type CryptoPayment = {
  network: PaymentNetwork;
  currency: string;
  chainId: number;
  toAddress: string;
  amountUSDCents: number;
  planId: PlanId;
  interval: "month" | "year";
  seats?: number;
};
