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
  walletAddress: string | null;
  txHash: string | null;
};

export type RemoteSession = {
  id: string;
  userId: string;
  startedAt: string;
  endedAt: string | null;
  durationSeconds: number | null;
  deviceType: "mobile" | "web" | "unknown";
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
  accentColor: "#2dd4bf",
};

export type StartRemoteSessionResponse = {
  sessionId: string;
  agentToken: string;
  expiresAt: string;
};

export function isAdminUser(user: {
  email: string;
  role?: string;
  publicMetadata?: Record<string, unknown>;
}): boolean {
  if ("role" in user && user.role === "admin") return true;
  if (
    "publicMetadata" in user &&
    user.publicMetadata &&
    (user.publicMetadata as Record<string, unknown>).role === "admin"
  ) {
    return true;
  }
  return false;
}
