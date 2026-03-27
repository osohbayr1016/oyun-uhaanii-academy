/// <reference types="@cloudflare/workers-types" />

export type WorkerBindings = {
  HYPERDRIVE: Hyperdrive;
  JWT_SECRET?: string;
  CORS_ORIGIN?: string;
  /** Public site URL for email links (newsletter unsubscribe, etc.) */
  FRONTEND_URL?: string;
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  NODE_ENV?: string;
};

export type HonoVariables = {
  user?: { userId: string };
};
