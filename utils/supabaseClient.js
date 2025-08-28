import { createClient } from "@supabase/supabase-js";

// Load Supabase project URL and public anon key from environment variables.
// These should be defined in your `.env.local` file for Next.js.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

console.log("supabase_url", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("supabase_key", process.env.NEXT_PUBLIC_SUPABASE_KEY);
// Create a single instance of the Supabase client to be used across the app.
// This instance provides access to Supabase services like auth, database, and storage.
export const supabase = createClient(supabaseUrl, supabaseKey);
