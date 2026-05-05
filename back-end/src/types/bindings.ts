/// <reference types="@cloudflare/workers-types" />

export type WorkerBindings = {
  HYPERDRIVE: Hyperdrive;
  /** Public images (R2); optional so non-Worker test envs can omit it */
  MEDIA_BUCKET?: R2Bucket;
  JWT_SECRET?: string;
  /** One origin or comma-separated list (e.g. www + apex domain). */
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
