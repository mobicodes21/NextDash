import { supabase } from "@/utils/supabaseClient";

/**
 * Fetches all user records from the "users" table.
 * Logs an error and returns an empty array if the request fails.
 *
 * @returns {Promise<Array>} - An array of user objects or an empty array on error.
 */
export const fetchUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) {
    console.error("Fetch users error:", error);
    return [];
  }
  return data;
};

/**
 * Fetches all product records from the "products" table.
 * Logs an error and returns an empty array if the request fails.
 *
 * @returns {Promise<Array>} - An array of product objects or an empty array on error.
 */
export const fetchProducts = async () => {
  const { data, error } = await supabase.from("products").select("*");
  if (error) {
    console.error("Fetch products error:", error);
    return [];
  }
  return data;
};
