export type PlanId = "trial" | "monthly" | "yearly";

export type Plan = {
  id: PlanId;
  name: string;
  description: string;
  priceCents: number;
  interval: "week" | "month" | "year" | null;
  sessionsIncluded: number | "unlimited";
  trialDays?: number;
  monthlyEquivalentCents?: number;
  discountPercent?: number;
  features: string[];
};

export const PLANS: Record<PlanId, Plan> = {
  trial: {
    id: "trial",
    name: "Trial",
    description: "1 free remote session during your first week",
    priceCents: 0,
    interval: "week",
    sessionsIncluded: 1,
    trialDays: 7,
    features: [
      "1 remote session",
      "7-day trial period",
      "Full IDE control",
      "File, terminal & git access",
    ],
  },
  monthly: {
    id: "monthly",
    name: "Pro",
    description: "Unlimited remote sessions, billed monthly",
    priceCents: 2000,
    interval: "month",
    sessionsIncluded: "unlimited",
    features: [
      "Unlimited remote sessions",
      "Usage dashboard & analytics",
      "Priority support",
      "Custom dashboard widgets",
    ],
  },
  yearly: {
    id: "yearly",
    name: "Pro Annual",
    description: "Save 20% with annual billing",
    priceCents: 19200,
    interval: "year",
    sessionsIncluded: "unlimited",
    monthlyEquivalentCents: 1600,
    discountPercent: 20,
    features: [
      "Everything in Pro",
      "20% savings vs monthly",
      "Annual billing",
      "Early access to new features",
    ],
  },
};

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
}
