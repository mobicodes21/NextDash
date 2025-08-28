import { createClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase client using the service role key.
 *
 * This function is intended to be used **server-side only**,
 * as the service role key has elevated privileges (e.g., bypassing RLS).
 *
 * @throws {Error} If required environment variables are missing.
 * @returns {SupabaseClient} A Supabase client instance with full server-side privileges.
 */
export function supabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase environment variables: URL or Service Role Key."
    );
  }

  return createClient(url, key);
}
