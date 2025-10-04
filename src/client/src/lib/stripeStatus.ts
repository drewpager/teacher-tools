// Stripe subscription status constants and utilities
export const STRIPE_STATUS = {
  ACTIVE: "active",
  TRIALING: "trialing",
  PAST_DUE: "past_due",
  CANCELED: "canceled",
  UNPAID: "unpaid",
  INCOMPLETE: "incomplete",
  INCOMPLETE_EXPIRED: "incomplete_expired",
  PAUSED: "paused",
  NO_ACTIVE_SUBSCRIPTION: "No active subscription",
  INACTIVE: "Inactive",
} as const;

export type StripeStatus = (typeof STRIPE_STATUS)[keyof typeof STRIPE_STATUS];

// Helper functions for status categorization
export const getStatusCategory = (
  status: string | undefined | null
): "active" | "warning" | "error" | "inactive" => {
  if (!status) return "inactive";

  switch (status.toLowerCase()) {
    case STRIPE_STATUS.ACTIVE:
    case STRIPE_STATUS.TRIALING:
      return "active";

    case STRIPE_STATUS.PAST_DUE:
    case STRIPE_STATUS.UNPAID:
    case STRIPE_STATUS.INCOMPLETE:
    case STRIPE_STATUS.PAUSED:
      return "warning";

    case STRIPE_STATUS.CANCELED:
    case STRIPE_STATUS.INCOMPLETE_EXPIRED:
    case STRIPE_STATUS.INACTIVE:
    case STRIPE_STATUS.NO_ACTIVE_SUBSCRIPTION:
      return "error";

    default:
      return "inactive";
  }
};

export const getStatusMessage = (
  status: string | undefined | null,
  trialEnd?: number | null
): string => {
  if (!status) return "No subscription found";

  switch (status.toLowerCase()) {
    case STRIPE_STATUS.ACTIVE:
      return "Your subscription is active and up to date";

    case STRIPE_STATUS.TRIALING:
      return "You are currently in your trial period";

    case STRIPE_STATUS.PAST_DUE:
      return "Your payment is past due. Please update your payment method";

    case STRIPE_STATUS.UNPAID:
      return "Your subscription has unpaid invoices. Please resolve to continue";

    case STRIPE_STATUS.CANCELED:
      return "Your subscription has been canceled";

    case STRIPE_STATUS.INCOMPLETE:
      return "Your subscription setup is incomplete. Please complete payment";

    case STRIPE_STATUS.INCOMPLETE_EXPIRED:
      return "Your subscription setup has expired. Please start a new subscription";

    case STRIPE_STATUS.PAUSED:
      return "Your subscription is currently paused";

    case STRIPE_STATUS.INACTIVE:
    case STRIPE_STATUS.NO_ACTIVE_SUBSCRIPTION:
      return "No active subscription";

    default:
      return `Subscription status: ${status}`;
  }
};

export const getStatusAction = (
  status: string | undefined | null
): {
  text: string;
  href: string;
  variant: "contained" | "outlined" | "text";
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
} => {
  if (!status) {
    return {
      text: "Start Donating",
      href: "/donate",
      variant: "contained",
      color: "primary",
    };
  }

  switch (status.toLowerCase()) {
    case STRIPE_STATUS.ACTIVE:
    case STRIPE_STATUS.TRIALING:
      return {
        text: "Manage Donations",
        href: "https://billing.stripe.com/p/login/5kA8zH7cq8eIdWMcMM",
        variant: "outlined",
        color: "primary",
      };

    case STRIPE_STATUS.PAST_DUE:
    case STRIPE_STATUS.UNPAID:
      return {
        text: "Update Payment Method",
        href: "https://billing.stripe.com/p/login/5kA8zH7cq8eIdWMcMM",
        variant: "contained",
        color: "warning",
      };

    case STRIPE_STATUS.INCOMPLETE:
      return {
        text: "Complete Setup",
        href: "https://billing.stripe.com/p/login/5kA8zH7cq8eIdWMcMM",
        variant: "contained",
        color: "warning",
      };

    case STRIPE_STATUS.PAUSED:
      return {
        text: "Resume Subscription",
        href: "https://billing.stripe.com/p/login/5kA8zH7cq8eIdWMcMM",
        variant: "contained",
        color: "info",
      };

    case STRIPE_STATUS.CANCELED:
    case STRIPE_STATUS.INCOMPLETE_EXPIRED:
    case STRIPE_STATUS.INACTIVE:
    case STRIPE_STATUS.NO_ACTIVE_SUBSCRIPTION:
    default:
      return {
        text: "Start Donating",
        href: "/donate",
        variant: "contained",
        color: "primary",
      };
  }
};

export const isSubscriptionActive = (
  status: string | undefined | null
): boolean => {
  return (
    status?.toLowerCase() === STRIPE_STATUS.ACTIVE ||
    status?.toLowerCase() === STRIPE_STATUS.TRIALING
  );
};

export const isSubscriptionInTrial = (
  status: string | undefined | null
): boolean => {
  return status?.toLowerCase() === STRIPE_STATUS.TRIALING;
};

export const needsPaymentAction = (
  status: string | undefined | null
): boolean => {
  const normalizedStatus = status?.toLowerCase();
  return (
    normalizedStatus === STRIPE_STATUS.PAST_DUE ||
    normalizedStatus === STRIPE_STATUS.UNPAID ||
    normalizedStatus === STRIPE_STATUS.INCOMPLETE ||
    normalizedStatus === STRIPE_STATUS.INCOMPLETE_EXPIRED
  );
};
