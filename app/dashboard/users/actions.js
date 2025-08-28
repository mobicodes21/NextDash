"use server";

import { deleteUserById, updateUserById } from "@/lib/data-server";

import { revalidatePath } from "next/cache";

// Deletes a user by ID and revalidates the user listing page
export async function deleteUserAction(userId) {
  await deleteUserById(userId);
  revalidatePath("/dashboard/users");
}

// Updates a user by ID with the provided payload and revalidates the user listing page
export async function updateUserAction(userId, payload) {
  await updateUserById(userId, payload);
  revalidatePath("/dashboard/users");
}
