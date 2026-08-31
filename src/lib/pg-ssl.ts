/** SSL for remote Postgres (Supabase / Neon). Local URLs stay plaintext. */
export function pgPoolSsl(connectionString: string): false | { rejectUnauthorized: true } {
  if (/localhost|127\.0\.0\.1/i.test(connectionString)) return false;
  return { rejectUnauthorized: true };
}

export function withSslMode(connectionString: string): string {
  if (/[?&]sslmode=/i.test(connectionString)) return connectionString;
  return `${connectionString}${connectionString.includes("?") ? "&" : "?"}sslmode=require`;
}
