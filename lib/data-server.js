import { supabaseServer } from "@/utils/supabaseServer";

/**
 * Deletes a user from the "users" table by their unique ID.
 * Throws an error if the deletion fails.
 *
 * @param {string} id - Unique identifier of the user to delete.
 */
export async function deleteUserById(id) {
  const sb = supabaseServer();
  const { error } = await sb.from("users").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

/**
 * Updates user data in the "users" table for a given ID.
 * Accepts a payload containing the fields to be updated.
 * Throws an error if the update fails.
 *
 * @param {string} id - Unique identifier of the user to update.
 * @param {object} payload - Key-value pairs of fields to be updated.
 */
export async function updateUserById(id, payload) {
  const sb = supabaseServer();
  const { error } = await sb.from("users").update(payload).eq("id", id);
  if (error) throw new Error(error.message);
}

/**
 * Deletes a product from the "products" table by its unique ID.
 * Throws an error if the deletion fails.
 *
 * @param {string} id - Unique identifier of the product to delete.
 */
export async function deleteProductById(id) {
  const sb = supabaseServer();
  const { error } = await sb.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

/**
 * Updates product data in the "products" table for a given ID.
 * Accepts a payload containing the fields to be updated.
 * Throws an error if the update fails.
 *
 * @param {string} id - Unique identifier of the product to update.
 * @param {object} payload - Key-value pairs of fields to be updated.
 */
export async function updateProductById(id, payload) {
  const sb = supabaseServer();
  const { error } = await sb.from("products").update(payload).eq("id", id);
  if (error) throw new Error(error.message);
}
