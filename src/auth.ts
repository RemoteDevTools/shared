import type { PlanId } from "./pricing";

export type UserRole = "user" | "admin";

export type SubscriptionStatus =
  | "trialing"
  | "active"
  | "past_due"
  | "canceled"
  | "expired";

export type UserProfile = {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  role: UserRole;
  createdAt: string;
};

export type SubscriptionInfo = {
  planId: PlanId;
  status: SubscriptionStatus;
  currentPeriodEnd: string | null;
  trialEndsAt: string | null;
  stripeCustomerId: string | null;
};

export type RemoteSession = {
  id: string;
  userId: string;
  startedAt: string;
  endedAt: string | null;
  durationSeconds: number | null;
  deviceType: "mobile" | "web" | "unknown";
  billed: boolean;
};

export type UsageStats = {
  totalSessions: number;
  totalDurationSeconds: number;
  sessionsThisWeek: number;
  sessionsThisMonth: number;
  trialSessionsUsed: number;
  trialSessionsRemaining: number;
  canStartSession: boolean;
  blockReason?: string;
};

export type DashboardWidget =
  | "sessions_chart"
  | "usage_stats"
  | "recent_activity"
  | "subscription"
  | "streak"
  | "weekly_goal";

export type DashboardPreferences = {
  theme: "light" | "dark" | "system";
  widgets: DashboardWidget[];
  weeklyGoalHours: number;
  accentColor: string;
};

export const DEFAULT_DASHBOARD_PREFERENCES: DashboardPreferences = {
  theme: "system",
  widgets: [
    "usage_stats",
    "sessions_chart",
    "recent_activity",
    "subscription",
    "streak",
  ],
  weeklyGoalHours: 10,
  accentColor: "#3b82f6",
};

export type StartRemoteSessionResponse = {
  sessionId: string;
  agentToken: string;
  expiresAt: string;
};

/** Built-in admin accounts — auto-promoted on signup/sign-in */
export const ADMIN_EMAILS = [
  "calebdavidbusiness@gmail.com",
  "onlyonekiragu@gmail.com",
] as const;

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase() as (typeof ADMIN_EMAILS)[number]);
}

export function isAdminUser(user: {
  email: string;
  role?: string;
}): boolean {
  return user.role === "admin" || isAdminEmail(user.email);
}
