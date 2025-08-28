"use server";
import { deleteProductById, updateProductById } from "@/lib/data-server";
import { revalidatePath } from "next/cache";
// Server action to delete a product by its ID
// After deletion, it revalidates the product dashboard path to ensure fresh data
export async function deleteProductAction(productId) {
  await deleteProductById(productId);
  revalidatePath("/dashboard/products");
}

// Server action to update a product by its ID with the given payload
// After updating, it revalidates the product dashboard path to ensure updated data is shown
export async function updateProductAction(productId, payload) {
  await updateProductById(productId, payload);
  revalidatePath("/dashboard/products");
}
