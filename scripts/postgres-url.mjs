/**
 * Resolve a Postgres URI from Vercel Marketplace / manual env.
 *
 * Connected Supabase on Vercel injects POSTGRES_URL (and siblings).
 * This app historically only read DATABASE_URL, so a linked store
 * still fell through to PGLite until we honor the marketplace names.
 *
 * Never log the resolved URI — it contains the database password.
 */

const POOLED_KEYS = [
  "DATABASE_URL",
  "POSTGRES_URL",
  "POSTGRES_PRISMA_URL",
];

const DIRECT_KEYS = [
  "POSTGRES_URL_NON_POOLING",
  "DATABASE_URL_UNPOOLED",
  "DIRECT_URL",
];

function read(env, key) {
  const value = env[key];
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

/** First non-empty URI from the preferred key list. */
export function resolvePostgresUrl(env = process.env, { preferDirect = false } = {}) {
  const order = preferDirect
    ? [...DIRECT_KEYS, ...POOLED_KEYS]
    : [...POOLED_KEYS, ...DIRECT_KEYS];
  for (const key of order) {
    const value = read(env, key);
    if (value) return { key, url: value };
  }
  return { key: null, url: undefined };
}

export function postgresUrl(env = process.env) {
  return resolvePostgresUrl(env).url;
}
